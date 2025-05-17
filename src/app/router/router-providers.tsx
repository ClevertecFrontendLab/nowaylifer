import { Outlet } from 'react-router';

import { AppLoaderWhileNavigating } from '~/shared/infra/app-loader';
import { ToastErrorLoggerProvider } from '~/shared/infra/error-logger';
import { ModalsProvider } from '~/shared/infra/modals-manager';

export const RouterProviders = () => (
    <AppLoaderWhileNavigating>
        <ToastErrorLoggerProvider>
            <ModalsProvider defaultModalProps={{ isCentered: true }}>
                <Outlet />
            </ModalsProvider>
        </ToastErrorLoggerProvider>
    </AppLoaderWhileNavigating>
);
