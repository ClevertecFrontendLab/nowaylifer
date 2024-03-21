import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from '@components/app-layout';
import { AuthLayout } from '@components/auth-layout';
import { AuthForm } from '@pages/auth-page';
import { ChangePassword } from '@pages/auth-page/change-password';
import { ConfirmEmail } from '@pages/auth-page/confirm-email';
import { AuthResultPage } from '@pages/auth-result-page';
import FeedbackPage from '@pages/feedback-page';
import MainPage from '@pages/main-page';
import { GetGoogleToken } from '@redux/auth';

import { loadable } from './loadable';
import { RoutePath } from './paths';
import { RequireAuth, RequireNoAuth, RequireRedirect } from './route-guards';

const loginOrResult = new RegExp(`(${RoutePath.Login})|(${RoutePath.Result})`);

const CalendarPage = loadable(() => import('@pages/calendar-page/calendar-page'));

export const routes = (
    <Routes>
        <Route element={<GetGoogleToken />} path={RoutePath.Root}>
            <Route element={<Navigate to={RoutePath.Main} />} index={true} />
        </Route>

        <Route element={<AuthLayout />}>
            <Route element={<RequireNoAuth redirectTo={RoutePath.Main} />}>
                <Route element={<AuthForm type='login' />} path={RoutePath.Login} />
                <Route element={<AuthForm type='register' />} path={RoutePath.Register} />
            </Route>

            <Route element={<RequireRedirect from={loginOrResult} redirectTo={RoutePath.Login} />}>
                <Route element={<AuthResultPage />} path={`${RoutePath.Result}/:status`} />
                <Route element={<ConfirmEmail />} path={RoutePath.ConfirmEmail} />
                <Route element={<ChangePassword />} path={RoutePath.ChangePassword} />
            </Route>
        </Route>

        <Route element={<RequireAuth redirectTo={RoutePath.Login} />}>
            <Route element={<AppLayout />}>
                <Route element={<MainPage />} path={RoutePath.Main} />
                <Route element={<FeedbackPage />} path={RoutePath.Feedback} />
                <Route element={<CalendarPage />} path={RoutePath.Calendar} />
            </Route>
        </Route>
    </Routes>
);
