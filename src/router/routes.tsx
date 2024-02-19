import { Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { AuthPage } from '@pages/auth-page';

export const Path = {
    Root: '/',
    Auth: '/auth',
    Register: '/auth/registration',
};

export const routes = (
    <Routes>
        <Route path={Path.Root} element={<MainPage />} />
        <Route path={Path.Auth} element={<AuthPage tab='login' />} />
        <Route path={Path.Register} element={<AuthPage tab='register' />} />
    </Routes>
);
