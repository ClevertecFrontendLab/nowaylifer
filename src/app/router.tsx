import { createBrowserRouter } from 'react-router';

import { recipeCategoryMap } from '~/entities/recipe';
import { mockRecipes } from '~/entities/recipe/mock-recipes';
import { RouteHandle } from '~/features/breadcrumbs';
import CategoryPage from '~/pages/category';
import JuiciestPage from '~/pages/Juiciest';
import MainPage from '~/pages/Main';
import RecipePage from '~/pages/Recipe/Recipe';

import RootLayout from './RootLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        handle: { breadcrumb: 'Главнaя' } satisfies RouteHandle,
        children: [
            { index: true, Component: MainPage },
            {
                path: ':category',
                handle: {
                    breadcrumb: (match) => recipeCategoryMap[match.params.category!].label,
                } satisfies RouteHandle,
                children: [
                    {
                        path: ':subcategory',
                        Component: CategoryPage,
                        handle: {
                            breadcrumb: (match) =>
                                recipeCategoryMap[match.params.category!].subcategories[
                                    match.params.subcategory!
                                ].label,
                        } satisfies RouteHandle,
                    },
                    {
                        path: ':subcategory/:id',
                        Component: RecipePage,
                        handle: {
                            breadcrumb: (match) => {
                                const { category, subcategory, id } = match.params;
                                return [
                                    {
                                        href: `/${category}/${subcategory}`,
                                        label: recipeCategoryMap[match.params.category!]
                                            .subcategories[match.params.subcategory!].label,
                                    },
                                    mockRecipes[Number(id)].title,
                                ];
                            },
                        } satisfies RouteHandle,
                    },
                ],
            },
            {
                path: 'juiciest',
                Component: JuiciestPage,
                handle: { breadcrumb: 'Самое сочное' } satisfies RouteHandle,
            },
        ],
    },
]);
