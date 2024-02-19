import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Path } from './routes';

export const RequireAuth = () => {
    const token = useAppSelector((state) => state.auth.token);
    const location = useLocation();
    return token ? <Outlet /> : <Navigate to={Path.Auth} state={{ from: location }} />;
};
