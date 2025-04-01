import { createBrowserRouter } from 'react-router';

import RootLayout from './RootLayout';

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
    },
]);
