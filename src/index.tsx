import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history, persistor, store } from '@redux/configure-store';
import { PersistGate } from 'redux-persist/integration/react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import React from 'react';

import { routes } from './router/routes';

import 'antd/dist/antd.variable.min.css';
import 'normalize.css';
import './index.less';

ConfigProvider.config({
    theme: {
        primaryColor: '#2f54eb',
        infoColor: '#2f54eb',
    },
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>{routes}</Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
