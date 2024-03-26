import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { PersistGate } from 'redux-persist/integration/react';
import { AppLoaderProvider } from '@components/app-loader';
import { AppModalProvider } from '@components/app-modal';
import { history, persistor, store } from '@redux/configure-store';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/ru_RU';
import { Locale } from 'antd/lib/locale-provider';
import moment from 'moment';

import datePickerLocale from './locale/date-picker.ru-RU';
import { routes } from './router/routes';

import 'antd/dist/antd.variable.min.css';
import 'normalize.css';

import './index.less';
import 'moment/locale/ru';

ConfigProvider.config({
    theme: {
        primaryColor: '#2f54eb',
        infoColor: '#2f54eb',
    },
});

const ruRu: Locale = { ...locale, DatePicker: datePickerLocale, Calendar: datePickerLocale };

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

if ('Cypress' in window) {
    const style = document.createElement('style');

    style.innerHTML = `*, *::after, *::before {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
      }`;
    document.head.appendChild(style);
}

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ConfigProvider locale={ruRu}>
                    <AppLoaderProvider>
                        <AppModalProvider>
                            <Router history={history}>{routes}</Router>
                        </AppModalProvider>
                    </AppLoaderProvider>
                </ConfigProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);
