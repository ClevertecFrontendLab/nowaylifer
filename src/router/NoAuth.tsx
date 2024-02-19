import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Outlet, Navigate } from 'react-router-dom';
import { Path } from './routes';

export const NoAuth = () => {
    const token = useAppSelector((state) => state.auth.token);
    return token ? <Navigate to={Path.Main} replace /> : <Outlet />;
};
