import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Outlet, Navigate } from 'react-router-dom';
import { Path } from './paths';

export const NoAuth = ({ redirectTo }: { redirectTo: Path }) => {
    const token = useAppSelector((state) => state.auth.token);
    return token ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
