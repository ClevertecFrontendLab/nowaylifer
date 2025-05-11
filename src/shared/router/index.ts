import { unstable_createContext } from 'react-router';

export const storeContext = unstable_createContext<AppStore>();

export { createRouteLoader } from './create-route-loader';

export const RoutePath = {
    Main: '/',
    Juiciest: '/the-juiciest',
    NotFound: '/not-found',
    Login: '/login',
    Signup: '/signup',
};
