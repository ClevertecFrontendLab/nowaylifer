import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { AuthPage } from '@pages/auth-page';
import { RequireAuth } from './RequireAuth';
import { NoAuth } from './NoAuth';

export const Path = {
    Root: '/',
    Main: '/main',
    Auth: '/auth',
    Register: '/auth/registration',
};

export const routes = (
    <Routes>
        <Route path={Path.Root} element={<Navigate to={Path.Main} />} />

        <Route element={<NoAuth />}>
            <Route path={Path.Auth} element={<AuthPage tab='login' />} />
            <Route path={Path.Register} element={<AuthPage tab='register' />} />
        </Route>

        <Route element={<RequireAuth />}>
            <Route path={Path.Main} element={<MainPage />} />
        </Route>
    </Routes>
);
