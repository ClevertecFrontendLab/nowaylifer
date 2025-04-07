// @ts-expect-error seems like a bug https://github.com/fontsource/fontsource/issues/1038
import '@fontsource-variable/inter';
import './styles.css';

import { RouterProvider } from 'react-router';

import { Providers } from './providers';
import { router } from './router';

export default function App() {
    return (
        <Providers>
            <RouterProvider router={router} />
        </Providers>
    );
}
