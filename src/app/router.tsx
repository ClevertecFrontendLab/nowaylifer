import { createBrowserRouter } from 'react-router';

import JuiciestPage from '~/pages/main/Juiciest';
import MainPage from '~/pages/main/Main';
import VeganPage from '~/pages/main/Vegan';
import { foodMenu } from '~/shared/constants/food-menu';
import { RouteHandle } from '~/shared/use-breadcrumbs';

import RootLayout from './RootLayout';

const subcategorySlugToBreadcrumb: Record<string, string> = {
    'second-courses': foodMenu[6].subcategories[2].label,
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
                    breadcrumb: (match) =>
                        match.params.category && categorySlugToBreadcrumb[match.params.category],
                } satisfies RouteHandle,
                children: [
                    {
                        path: ':subcategory',
                        Component: VeganPage,
                        handle: {
                            breadcrumb: (match) =>
                                match.params.subcategory &&
                                subcategorySlugToBreadcrumb[match.params.subcategory],
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
