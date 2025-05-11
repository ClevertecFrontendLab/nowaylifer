import {
    CloseButtonProps,
    createStandaloneToast,
    UseToastOptions as BaseUseToastOptions,
} from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';

import { Toast } from './toast-component';

export const { toast: baseToast } = createStandaloneToast();

export interface UseToastOptions extends BaseUseToastOptions {
    closeButtonProps?: CloseButtonProps;
    testId?: string;
}

export const toast = ({ closeButtonProps, testId, ...options }: UseToastOptions) =>
    baseToast({
        isClosable: true,
        render: ({ position: _, ...props }) => (
            <Toast
                data-test-id={testId ?? TestId.ERROR_ALERT}
                closeButtonProps={{ 'data-test-id': TestId.ERROR_ALERT_CLOSE, ...closeButtonProps }}
                {...props}
            />
        ),
        ...options,
    });

toast.update = baseToast.update;
toast.close = baseToast.close;
toast.closeAll = baseToast.closeAll;
toast.isActive = baseToast.isActive;
