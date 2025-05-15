import { noop } from 'lodash-es';
import { createBrowserRouter, RouteObject } from 'react-router';

import {
    ActiveCategories,
    buildCategoryPath,
    CategoryParams,
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
import { AppLoaderSpinner } from '~/shared/infra/app-loader';
import { RoutePath, storeContext } from '~/shared/router';
import { checkAuthMiddleware } from '~/shared/session';
import {
    hideRouteIfAuthenticatedMiddleware,
    privateRouteMiddleware,
} from '~/shared/session/router-middlewares';
import { PageNotFound } from '~/widgets/page-not-found';

import RootLayout from './root-layout';
import { RouterProviders } from './router-providers';

const routerConfig: RouteObject[] = [
    {
        Component: RouterProviders,
        hydrateFallbackElement: <AppLoaderSpinner bg='transparent' />,
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
                    crumb: (_, { pathname }) =>
                        pathname === RoutePath.NotFound ? undefined : 'Главная',
                } satisfies RouteBreadcrumb,
                loader: noop,
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
                        path: CategoryParams.RootCategory.pattern,
                        handle: {
                            crumb: (_m, _l, [root]) => ({
                                label: root.title,
                                href: buildCategoryPath(root, root.subCategories[0]),
                            }),
                        } satisfies RouteBreadcrumb<ActiveCategories>,
                        errorElement: <PageNotFound />,
                        Component: NavigateToSubCategory,
                        children: [
                            {
                                path: CategoryParams.SubCategory.pattern,
                                handle: {
                                    crumb: (_m, _l, [_root, sub]) => sub.title,
                                } satisfies RouteBreadcrumb<ActiveCategories>,
                                children: [
                                    {
                                        index: true,
                                        Component: CategoryPage,
                                        loader: categoryPageLoader,
                                    },
                                    {
                                        path: ':id',
                                        Component: RecipePage,
                                        loader: recipePageLoader,
                                        handle: {
                                            crumb: (match) => match.data?.title,
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
