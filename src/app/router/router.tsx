import { noop } from 'lodash-es';
import { createBrowserRouter, RouteObject } from 'react-router';

import {
    initCategoriesMiddleware,
    NavigateToSubCategory,
    validateCategoryParamsMiddleware,
} from '~/entities/category';
import { recipeLoader } from '~/entities/recipe';
import { AuthLayout, EmailVerificationCallback, LoginForm, SignupForm } from '~/pages/auth';
import { BlogPage, blogPageLoader } from '~/pages/blog';
import { BlogsPage } from '~/pages/blogs';
import { blogsPageLoader } from '~/pages/blogs/loader';
import { CategoryPage, categoryPageLoader } from '~/pages/category';
import { CreateRecipePage } from '~/pages/create-recipe/create-recipe-page';
import { JuiciestPage, juiciestPageLoader } from '~/pages/juiciest';
import { MainPage } from '~/pages/main';
import { RecipePage } from '~/pages/recipe';
import { UpdateRecipePage } from '~/pages/update-recipe';
import { RouteParam, RoutePath, routerContext, storeContext } from '~/shared/router';
import {
    checkAuthMiddleware,
    hideRouteIfAuthenticatedMiddleware,
    privateRouteMiddleware,
} from '~/shared/session';
import { PageNotFound } from '~/widgets/page-not-found';

import RootLayout from '../root-layout';
import { HydrateFallback } from './hydrate-fallback';
import * as routeCrumb from './route-breadcrumbs';
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
                handle: { crumb: routeCrumb.mainCrumb },
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
                        Component: JuiciestPage,
                        loader: juiciestPageLoader,
                        handle: { crumb: routeCrumb.juiciestCrumb },
                    },
                    {
                        path: RoutePath.NewRecipe,
                        Component: CreateRecipePage,
                        handle: { crumb: routeCrumb.newRecipeCrumb },
                    },
                    {
                        path: RoutePath.Category.pattern,
                        Component: CategoryPage,
                        loader: categoryPageLoader,
                        handle: { crumb: routeCrumb.categoryCrumbs },
                    },
                    {
                        path: RoutePath.Recipe.pattern,
                        Component: RecipePage,
                        loader: recipeLoader,
                        handle: { crumb: routeCrumb.recipeCrumbs },
                    },
                    {
                        path: RoutePath.EditRecipe.pattern,
                        Component: UpdateRecipePage,
                        loader: recipeLoader,
                        handle: { crumb: routeCrumb.recipeCrumbs },
                    },
                    {
                        path: `:${RouteParam.RootCategory}`,
                        Component: NavigateToSubCategory,
                    },
                    {
                        path: RoutePath.Blogs,
                        Component: BlogsPage,
                        loader: blogsPageLoader,
                        handle: { crumb: routeCrumb.blogsCrumb },
                    },
                    {
                        path: RoutePath.Blog.pattern,
                        Component: BlogPage,
                        loader: blogPageLoader,
                        handle: { crumb: routeCrumb.blogCrumbs },
                    },
                ],
            },
        ],
    },
];

export const createRouter = (store: AppStore) => {
    const router = createBrowserRouter(routerConfig, {
        future: { unstable_middleware: true },
        unstable_getContext: () => {
            const map = new Map();
            map.set(storeContext, store);
            map.set(routerContext, () => router);
            return map;
        },
    });
    return router;
};
