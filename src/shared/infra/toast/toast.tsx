import {
    CloseButtonProps,
    createStandaloneToast,
    UseToastOptions as BaseUseToastOptions,
} from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';
import { isE2E } from '~/shared/util';

import { Toast } from './toast-component';

export const { toast: baseToast } = createStandaloneToast();

export interface ToastOptions extends BaseUseToastOptions {
    ref?: React.Ref<HTMLDivElement>;
    closeButtonProps?: CloseButtonProps;
}

export const toast = ({ ref, closeButtonProps, ...options }: ToastOptions) =>
    baseToast({
        isClosable: true,
        duration: isE2E() ? 10000 : 5000,
        containerStyle: { m: 0, pb: { base: 25, lg: 20 } },
        render: ({ position, containerStyle, ...props }) => (
            <Toast
                ref={ref}
                data-test-id={TestId.ERROR_ALERT}
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
