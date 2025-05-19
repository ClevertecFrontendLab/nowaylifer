import { noop } from 'lodash-es';
import { createBrowserRouter, RouteObject } from 'react-router';

import {
    ActiveCategories,
    buildCategoryPath,
    initCategoriesMiddleware,
    NavigateToSubCategory,
    validateCategoryParamsMiddleware,
} from '~/entities/category';
import { RecipeWithAuthor } from '~/entities/recipe';
import { RouteBreadcrumb } from '~/features/breadcrumbs';
import { AuthLayout, EmailVerificationCallback, LoginForm, SignupForm } from '~/pages/auth';
import { CategoryPage, categoryPageLoader } from '~/pages/category';
import { JuiciestPage, juiciestPageLoader } from '~/pages/juiciest';
import { MainPage } from '~/pages/main';
import { RecipePage, recipePageLoader } from '~/pages/recipe';
import { paramPattern, RouteParam, RoutePath, storeContext } from '~/shared/router';
import {
    checkAuthMiddleware,
    hideRouteIfAuthenticatedMiddleware,
    privateRouteMiddleware,
} from '~/shared/session';
import { PageNotFound } from '~/widgets/page-not-found';

import RootLayout from '../root-layout';
import { HydrateFallback } from './hydrate-fallback';
import { RouterProviders } from './router-providers';

const routerConfig: RouteObject[] = [
    {
        Component: RouterProviders,
        HydrateFallback,
        unstable_middleware: [checkAuthMiddleware],
        loader: noop, // stub loader to always run middleware
        children: [
            {
                unstable_middleware: [hideRouteIfAuthenticatedMiddleware],
                children: [
                    {
                        path: RoutePath.EmailVerificationCallback,
                        Component: EmailVerificationCallback,
                    },
                    {
                        Component: AuthLayout,
                        children: [
                            { path: RoutePath.Login, Component: LoginForm },
                            { path: RoutePath.Signup, Component: SignupForm },
                        ],
                    },
                ],
            },
            {
                Component: RootLayout,
                handle: {
                    crumb: ({ location }) =>
                        location.pathname === RoutePath.NotFound ? undefined : 'Главная',
                } satisfies RouteBreadcrumb,
                loader: noop,
                HydrateFallback,
                unstable_middleware: [
                    privateRouteMiddleware,
                    initCategoriesMiddleware,
                    validateCategoryParamsMiddleware,
                ],
                children: [
                    { index: true, Component: MainPage },
                    { path: RoutePath.NotFound, Component: PageNotFound },
                    {
                        path: RoutePath.Juiciest,
                        handle: { crumb: 'Самое сочное' },
                        Component: JuiciestPage,
                        loader: juiciestPageLoader,
                    },
                    {
                        path: paramPattern(RouteParam.RootCategory),
                        handle: {
                            crumb: ({ extraArg: [root] }) => ({
                                label: root.title,
                                href: buildCategoryPath(root, root.subCategories[0]),
                            }),
                        } satisfies RouteBreadcrumb<ActiveCategories>,
                        errorElement: <PageNotFound />,
                        Component: NavigateToSubCategory,
                        children: [
                            {
                                path: paramPattern(RouteParam.SubCategory),
                                handle: {
                                    crumb: ({ extraArg: [_, sub] }) => sub.title,
                                } satisfies RouteBreadcrumb<ActiveCategories>,
                                children: [
                                    {
                                        index: true,
                                        Component: CategoryPage,
                                        loader: categoryPageLoader,
                                    },
                                    {
                                        path: paramPattern(RouteParam.RecipeId),
                                        Component: RecipePage,
                                        loader: recipePageLoader,
                                        handle: {
                                            crumb: ({ match }) => ({ label: match.data?.title }),
                                        } satisfies RouteBreadcrumb<
                                            ActiveCategories,
                                            RecipeWithAuthor
                                        >,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

export const createRouter = (store: AppStore) =>
    createBrowserRouter(routerConfig, {
        future: { unstable_middleware: true },
        unstable_getContext: () => new Map([[storeContext, store]]),
    });
