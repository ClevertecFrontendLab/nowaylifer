import { createBrowserRouter } from 'react-router';

import JuiciestPage from '~/pages/Juiciest';
import MainPage from '~/pages/Main';
import RecipePage from '~/pages/Recipe/Recipe';
import VeganPage from '~/pages/Vegan';
import { foodMenu } from '~/shared/constants/food-menu';
import { recipies } from '~/shared/constants/recipes';
import { RouteHandle } from '~/shared/use-breadcrumbs';

import RootLayout from './RootLayout';

const subcategorySlugToBreadcrumb: Record<string, string> = {
    'second-dish': foodMenu[6].subcategories[2].label,
};

const categorySlugToBreadcrumb: Record<string, string> = {
    vegan: foodMenu[6].category.label,
};

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
                    breadcrumb: (match) => categorySlugToBreadcrumb[match.params.category!],
                } satisfies RouteHandle,
                children: [
                    {
                        path: ':subcategory',
                        Component: VeganPage,
                        handle: {
                            breadcrumb: (match) =>
                                subcategorySlugToBreadcrumb[match.params.subcategory!],
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
                                        label: subcategorySlugToBreadcrumb[subcategory!],
                                    },
                                    recipies[Number(id)].title,
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
