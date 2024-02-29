import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@components/auth-layout';
import { MainPage } from '@pages/main-page';
import { Path } from './paths';
import { RequireAuth, RequireNoAuth, RequireRedirect } from './route-guards';
import { AuthResultPage } from '@pages/auth-result-page/auth-result-page';
import { AuthForm } from '@pages/auth-page';
import { ConfirmEmail } from '@pages/auth-page/confirm-email';
import { ChangePassword } from '@pages/auth-page/change-password';
import { MainLayout } from '@components/main-layout';

const loginOrResult = new RegExp(`(${Path.Login})|(${Path.Result})`);

export const routes = (
    <Routes>
        <Route path={Path.Root} element={<Navigate to={Path.Main} />} />

        <Route element={<AuthLayout />}>
            <Route element={<RequireNoAuth redirectTo={Path.Main} />}>
                <Route path={Path.Login} element={<AuthForm type='login' />} />
                <Route path={Path.Register} element={<AuthForm type='register' />} />
            </Route>

            <Route element={<RequireRedirect from={loginOrResult} redirectTo={Path.Login} />}>
                <Route path={Path.Result + '/:status'} element={<AuthResultPage />} />
                <Route path={Path.ConfirmEmail} element={<ConfirmEmail />} />
                <Route path={Path.ChangePassword} element={<ChangePassword />} />
            </Route>
        </Route>

        <Route element={<RequireAuth redirectTo={Path.Login} />}>
            <Route element={<MainLayout />}>
                <Route path={Path.Main} element={<MainPage />} />
            </Route>
        </Route>
    </Routes>
);
