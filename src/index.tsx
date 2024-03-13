import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history, persistor, store } from '@redux/configure-store';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

import { routes } from './router/routes';

import 'antd/dist/antd.variable.min.css';
import 'normalize.css';
import './index.less';
import { AppLoaderProvider } from '@components/app-loader';
import { AppModalProvider } from '@components/app-modal';

ConfigProvider.config({
    theme: {
        primaryColor: '#2f54eb',
        infoColor: '#2f54eb',
    },
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

// React.StrictMode is disabled because it's breaks Antd Carousel in TrainingPopover
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <AppLoaderProvider>
                <AppModalProvider>
                    <Router history={history}>{routes}</Router>
                </AppModalProvider>
            </AppLoaderProvider>
        </PersistGate>
    </Provider>,
);
