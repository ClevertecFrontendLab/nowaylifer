// @ts-expect-error seems like a bug https://github.com/fontsource/fontsource/issues/1038
import '@fontsource-variable/inter';
import './styles.css';

import { ChakraProvider } from '@chakra-ui/react';
import { Provider as StoreProvider } from 'react-redux';
import { RouterProvider as ReactRouterProvider } from 'react-router';

import { AppLoaderContainer } from '~/shared/infra/app-loader';

import { createRouter } from './router/router';
import { store } from './store';
import { theme } from './theme';

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <StoreProvider store={store}>
                <AppLoaderContainer />
                <ReactRouterProvider router={createRouter(store)} />
            </StoreProvider>
        </ChakraProvider>
    );
}
