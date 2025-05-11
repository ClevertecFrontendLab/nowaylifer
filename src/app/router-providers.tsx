import { Outlet } from 'react-router';

import { AppLoaderOnNavigation } from '~/shared/infra/app-loader';
import { ModalsProvider } from '~/shared/infra/modals-provider';

export const RouterProviders = () => (
    <AppLoaderOnNavigation>
        <ModalsProvider defaultModalProps={{ isCentered: true }}>
            <Outlet />
        </ModalsProvider>
    </AppLoaderOnNavigation>
);
