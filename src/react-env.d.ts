import type {} from 'react';

declare global {
    namespace React {
        interface HTMLAttributes {
            'data-test-id'?: string;
        }
    }
}
