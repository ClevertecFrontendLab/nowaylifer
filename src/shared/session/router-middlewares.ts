import { redirect, unstable_createContext, unstable_MiddlewareFunction } from 'react-router';

import { RoutePath, storeContext } from '../router';
import { sessionApi } from './api';
import { selectToken } from './slice';

const sessionContext = unstable_createContext({ isAuthenticated: false });

let checked = false;

export const checkAuthMiddleware: unstable_MiddlewareFunction = async ({ context }, next) => {
    const store = context.get(storeContext);

    if (checked) {
        context.set(sessionContext, { isAuthenticated: !!selectToken(store.getState()) });
        return next();
    }

    const res = await store.dispatch(sessionApi.endpoints.refreshToken.initiate());

    if (!res.error) {
        context.set(sessionContext, { isAuthenticated: true });
    }

    checked = true;

    return next();
};

export const hideRouteIfAuthenticatedMiddleware: unstable_MiddlewareFunction = (
    { context },
    next,
) => {
    if (context.get(sessionContext).isAuthenticated) {
        throw redirect(RoutePath.Main);
    }
    return next();
};

export const privateRouteMiddleware: unstable_MiddlewareFunction = ({ context }, next) => {
    if (context.get(sessionContext).isAuthenticated) {
        return next();
    }
    throw redirect(RoutePath.Login);
};
