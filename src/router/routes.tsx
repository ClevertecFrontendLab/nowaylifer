import { AppLayout } from '@components/app-layout';
import { AuthLayout } from '@components/auth-layout';
import { AuthForm } from '@pages/auth-page';
import { ChangePassword } from '@pages/auth-page/change-password';
import { ConfirmEmail } from '@pages/auth-page/confirm-email';
import { AuthResultPage } from '@pages/auth-result-page';
import { GetGoogleToken } from '@redux/auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Path } from './paths';
import { RequireAuth, RequireNoAuth, RequireRedirect } from './route-guards';
import FeedbackPage from '@pages/feedback-page';
import MainPage from '@pages/main-page';
import { loadable } from './loadable';

const loginOrResult = new RegExp(`(${Path.Login})|(${Path.Result})`);

const CalendarPage = loadable(() => import('@pages/calendar-page/calendar-page'));
/* const FeedbackPage = loadable(() => import('@pages/feedback-page'));
const MainPage = loadable(() => import('@pages/main-page')); */

export const routes = (
    <Routes>
        <Route path={Path.Root} element={<GetGoogleToken />}>
            <Route index element={<Navigate to={Path.Main} />} />
        </Route>

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
            <Route element={<AppLayout />}>
                <Route path={Path.Main} element={<MainPage />} />
                <Route path={Path.Feedback} element={<FeedbackPage />} />
                <Route path={Path.Calendar} element={<CalendarPage />} />
            </Route>
        </Route>
    </Routes>
);
