import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useAppLocation } from '@hooks/use-app-location';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const RequireNoAuth = ({ redirectTo }: { redirectTo: string }) => {
    const token = useAppSelector((state) => state.auth.token);
    return token ? <Navigate to={redirectTo} replace /> : <Outlet />;
};

export const RequireAuth = ({ redirectTo }: { redirectTo: string }) => {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();
    return token ? <Outlet /> : <Navigate to={redirectTo} state={{ from: location }} replace />;
};

export const RequireRedirect = ({
    from,
    redirectTo,
}: {
    from: RegExp | string;
    redirectTo: string;
}) => {
    const location = useAppLocation();
    const fromState = location.state?.from;

    if (fromState) {
        if (from instanceof RegExp && from.test(fromState.pathname)) {
            return <Outlet />;
        } else if (typeof from === 'string' && fromState.pathname === from) {
            return <Outlet />;
        }
    }

    return <Navigate to={redirectTo} replace />;
};
