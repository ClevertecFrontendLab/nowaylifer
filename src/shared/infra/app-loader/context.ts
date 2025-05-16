import { createContext } from '@chakra-ui/utils';

export interface AppLoaderContext {
    start: (id?: string, withOverlay?: boolean) => void;
    stop: (id?: string) => void;
    stopAll: () => void;
    isRunning: (id?: string) => boolean;
}

export const [AppLoaderContextProvider, useAppLoader] = createContext<AppLoaderContext>();
