import { Outlet } from 'react-router';

import { AppLoaderOnNavigation } from '~/shared/infra/app-loader';
import { ToastErrorLoggerProvider } from '~/shared/infra/error-logger';
import { ModalsProvider } from '~/shared/infra/modals-manager';

export const RouterProviders = () => (
    <AppLoaderOnNavigation>
        <ToastErrorLoggerProvider>
            <ModalsProvider defaultModalProps={{ isCentered: true }}>
                <Outlet />
            </ModalsProvider>
        </ToastErrorLoggerProvider>
    </AppLoaderOnNavigation>
);
