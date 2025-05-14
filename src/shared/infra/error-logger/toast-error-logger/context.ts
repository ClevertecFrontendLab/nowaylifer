import { createContext } from '@chakra-ui/utils';
import { RefCallback } from 'react';

export const [ToastErrorLoggerContextProvider, useToastErrorLogger] = createContext<{
    anchorRef: RefCallback<HTMLElement>;
}>();
