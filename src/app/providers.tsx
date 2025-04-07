import { ChakraProvider } from '@chakra-ui/react';
import { Provider as StoreProvider } from 'react-redux';

import { store } from '~/store/configure-store';

import { theme } from './theme';

export const Providers = ({ children }: React.PropsWithChildren) => (
    <ChakraProvider theme={theme}>
        <StoreProvider store={store}>{children}</StoreProvider>
    </ChakraProvider>
);
