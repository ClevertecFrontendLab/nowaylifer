import { noop } from 'lodash';
import { createBrowserRouter, RouteObject } from 'react-router';

import {
    ActiveCategories,
    CategoryParams,
    initCategoriesMiddleware,
    validateCategoryParamsMiddleware,
} from '~/entities/category';
import { RecipeWithAuthor } from '~/entities/recipe';
import { RouteBreadcrumb } from '~/features/breadcrumbs';
import { CategoryPage, categoryPageLoader } from '~/pages/category';
import { JuiciestPage, juiciestPageLoader } from '~/pages/juiciest';
import { MainPage } from '~/pages/main';
import { RecipePage, recipePageLoader } from '~/pages/recipe';
import { storeContext } from '~/shared/router';
import { AppLoaderSpinner } from '~/widgets/app-loader';
import { PageNotFound } from '~/widgets/PageNotFound';

import RootLayout from '../RootLayout';
import { AppLoaderOnNavigation } from './AppLoaderOnNavigation';
import { NavigateToSubCategory } from './NavigateToSubCategory';
import { NotFoundErrorBoundary } from './NotFoundErrorBoundary';

const routerConfig: RouteObject[] = [
    {
        Component: AppLoaderOnNavigation,
        hydrateFallbackElement: <AppLoaderSpinner bg='transparent' />,
        unstable_middleware: [initCategoriesMiddleware],
        loader: noop,
        children: [
            {
                Component: RootLayout,
                handle: {
                    crumb: (_, location) => (location.pathname === '/not-found' ? '' : 'Главная'),
                } satisfies RouteBreadcrumb,
                unstable_middleware: [validateCategoryParamsMiddleware],
                errorElement: <NotFoundErrorBoundary />,
                children: [
                    { index: true, Component: MainPage },
                    { path: 'not-found', Component: PageNotFound },
                    {
                        path: 'the-juiciest',
                        handle: { crumb: 'Самое сочное' },
                        Component: JuiciestPage,
                        loader: juiciestPageLoader,
                    },
                    {
                        path: CategoryParams.RootCategory.pattern,
                        Component: NavigateToSubCategory,
                        handle: {
                            crumb: (_m, _l, [root]) => root.title,
                        } satisfies RouteBreadcrumb<ActiveCategories>,
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
                                            crumb: (match) => match.data.title,
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
