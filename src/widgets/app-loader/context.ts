import { createContext } from '@chakra-ui/utils';

export interface AppLoaderContext {
    start: (id?: string) => void;
    stop: (id?: string) => void;
    stopAll: () => void;
    isRunning: (id?: string) => boolean;
}

export const [AppLoaderContextProvider, useAppLoader] = createContext<AppLoaderContext>();
