import {
    CloseButtonProps,
    useToast as useToastBase,
    UseToastOptions as BaseUseToastOptions,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { TestId } from '~/shared/test-ids';
import { isE2E } from '~/shared/util';

import { Toast } from './toast';
import { useToastAnchor } from './use-toast-anchor';

export interface ToastOptions extends BaseUseToastOptions {
    isAnchored?: boolean;
    closeButtonProps?: CloseButtonProps;
}

const defaultOptions: ToastOptions = {};

export const useToast = (options: ToastOptions = defaultOptions) => {
    const { toastRef, anchorRef } = useToastAnchor(options.isAnchored ?? false);

    const toast = useToastBase(
        useMemo(() => {
            const { closeButtonProps, ...rest } = options;
            return {
                isClosable: true,
                duration: isE2E() ? 10000 : 5000,
                containerStyle: { m: 0, pb: { base: 25, lg: 20 } },
                render: ({ position, containerStyle, ...props }) => (
                    <Toast
                        ref={toastRef}
                        data-test-id={TestId.ERROR_ALERT}
                        closeButtonProps={{
                            'data-test-id': TestId.ERROR_ALERT_CLOSE,
                            ...closeButtonProps,
                        }}
                        {...props}
                    />
                ),
                ...rest,
            };
        }, [options, toastRef]),
    );

    return { toast, anchorRef };
};

export type ToastFunction = ReturnType<typeof useToast>['toast'];
