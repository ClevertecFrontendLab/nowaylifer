import { createBrowserRouter } from 'react-router';

import MainPage from '~/pages/main/Main';
import VeganPage from '~/pages/main/Vegan';

import RootLayout from './RootLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            { index: true, Component: MainPage },
            { path: 'vegan/second-courses', Component: VeganPage },
        ],
    },
]);
