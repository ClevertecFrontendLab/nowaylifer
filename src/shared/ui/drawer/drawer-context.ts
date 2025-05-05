import { createContext } from '@chakra-ui/utils';

export type DrawerContextType = { open: () => void; close: () => void; isOpen: boolean };

export const [DrawerContextProvider, useDrawerContext] = createContext<DrawerContextType>();
