import { MotionGlobalConfig } from 'framer-motion';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app/App';
import { isE2E } from './shared/lib/is-e2e';

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);

if (isE2E()) {
    MotionGlobalConfig.skipAnimations = true;
}
