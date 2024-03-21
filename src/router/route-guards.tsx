import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useAppLocation } from '@hooks/use-app-location';
import { setAuthFrom } from '@redux/auth';

export const RequireNoAuth = ({ redirectTo }: { redirectTo: string }) => {
    const token = useAppSelector((state) => state.auth.token);

    return token ? <Navigate replace={true} to={redirectTo} /> : <Outlet />;
};

export const RequireAuth = ({ redirectTo }: { redirectTo: string }) => {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();
    const dispatch = useAppDispatch();

    dispatch(setAuthFrom(location));

    return token ? <Outlet /> : <Navigate replace={true} to={redirectTo} />;
};

export const RequireRedirect = ({
    from,
    redirectTo,
}: {
    from: RegExp | string;
    redirectTo: string;
}) => {
    const location = useAppLocation();
    const fromPath = location.state?.from?.pathname;

    if (
        (fromPath && from instanceof RegExp && from.test(fromPath)) ||
        (typeof from === 'string' && fromPath === from)
    ) {
        return <Outlet />;
    }

    return <Navigate replace={true} to={redirectTo} />;
};
