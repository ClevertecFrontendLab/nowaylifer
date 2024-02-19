import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Path } from './paths';

export const RequireAuth = ({ redirectTo }: { redirectTo: Path }) => {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();
    return token ? <Outlet /> : <Navigate to={redirectTo} state={{ from: location }} />;
};
