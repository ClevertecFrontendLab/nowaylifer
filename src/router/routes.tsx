import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@components/auth-layout';
import { MainPage } from '@pages/main-page';
import { AuthPage } from '@pages/auth-page';
import { Path } from './paths';
import { RequireAuth, RequireNoAuth, RequireRedirect } from './route-guards';
import { AuthResultPage } from '@pages/auth-result-page/auth-result-page';

export const routes = (
    <Routes>
        <Route path={Path.Root} element={<Navigate to={Path.Main} />} />

        <Route element={<AuthLayout />}>
            <Route element={<RequireNoAuth redirectTo={Path.Main} />}>
                <Route path={Path.Login} element={<AuthPage tab='login' />} />
                <Route path={Path.Register} element={<AuthPage tab='register' />} />
            </Route>

            <Route
                element={<RequireRedirect from={new RegExp(Path.Login)} redirectTo={Path.Login} />}
            >
                <Route path={Path.Result + '/:status'} element={<AuthResultPage />} />
            </Route>
        </Route>

        <Route element={<RequireAuth redirectTo={Path.Login} />}>
            <Route path={Path.Main} element={<MainPage />} />
        </Route>
    </Routes>
);
