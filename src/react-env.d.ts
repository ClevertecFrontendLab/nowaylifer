import type {} from 'react';
import type {} from 'react-router';

declare global {
    namespace React {
        interface HTMLAttributes {
            'data-test-id'?: string;
        }
    }
}

declare module 'react-router' {
    interface Future {
        unstable_middleware: true;
    }
}
