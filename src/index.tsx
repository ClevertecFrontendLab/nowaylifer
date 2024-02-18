import { HistoryRouter as Router } from 'redux-first-history/rr6';
import { history, store } from '@redux/configure-store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import React from 'react';
import { routes } from './router';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.less';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>{routes}</Router>
        </Provider>
    </React.StrictMode>,
);
