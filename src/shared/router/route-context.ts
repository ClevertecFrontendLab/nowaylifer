import { createBrowserRouter, unstable_createContext } from 'react-router';

export const storeContext = unstable_createContext<AppStore>();

export const routerContext = unstable_createContext<() => ReturnType<typeof createBrowserRouter>>();
