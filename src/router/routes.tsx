import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from '@pages/main-page';
import { AuthPage } from '@pages/auth-page';
import { RequireAuth } from './RequireAuth';
import { NoAuth } from './NoAuth';
import { Path } from './paths';

export const routes = (
    <Routes>
        <Route path={Path.Root} element={<Navigate to={Path.Main} />} />

        <Route element={<NoAuth redirectTo={Path.Main} />}>
            <Route path={Path.Auth} element={<AuthPage tab='login' />} />
            <Route path={Path.Register} element={<AuthPage tab='register' />} />
        </Route>

        <Route element={<RequireAuth redirectTo={Path.Auth} />}>
            <Route path={Path.Main} element={<MainPage />} />
        </Route>
    </Routes>
);
