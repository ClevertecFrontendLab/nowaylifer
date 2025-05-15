// @ts-expect-error seems like a bug https://github.com/fontsource/fontsource/issues/1038
import '@fontsource-variable/inter';
import './styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider as StoreProvider } from 'react-redux';
import { RouterProvider as ReactRouterProvider } from 'react-router';

import { AppLoaderProvider } from '~/shared/infra/app-loader';

import { createRouter } from './router';
import { store } from './store';
import { theme } from './theme';

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <StoreProvider store={store}>
                <AppLoaderProvider>
                    <ReactRouterProvider router={createRouter(store)} />
                </AppLoaderProvider>
            </StoreProvider>
        </ChakraProvider>
    );
}
