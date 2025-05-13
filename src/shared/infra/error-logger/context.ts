import { createContext } from '@chakra-ui/utils';

import { ToastOptions } from '../toast/toast';

export const [ToastErrorLoggerContextProvider, useToastErrorLogger] = createContext<{
    setToastOptions: (options: ToastOptions | null) => void;
}>();
