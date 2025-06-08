import { useToast as useToastBase, UseToastOptions as BaseUseToastOptions } from '@chakra-ui/react';
import { useMemo } from 'react';

import { TestId } from '~/shared/test-ids';
import { isE2E } from '~/shared/util';

import { Toast, ToastTestId } from './toast';
import { useToastAnchor } from './use-toast-anchor';

export interface ToastOptions extends BaseUseToastOptions {
    isAnchored?: boolean;
    testId?: Partial<ToastTestId>;
}

const toastTestId: ToastTestId = {
    root: TestId.ERROR_TOAST,
    closeButton: TestId.ERROR_TOAST_CLOSE,
    title: TestId.ERROR_TOAST_TITLE,
    description: TestId.ERROR_TOAST_DESCRIPTION,
};

const defaultOptions: ToastOptions = {};

export const useToast = (options: ToastOptions = defaultOptions) => {
    const { toastRef, anchorRef } = useToastAnchor(options.isAnchored ?? false);

    const toast = useToastBase(
        useMemo(
            () => ({
                isClosable: true,
                duration: isE2E() ? 10000 : 5000,
                containerStyle: { m: 0, pb: { base: 25, lg: 20 } },
                render: ({ position, containerStyle, ...props }) => (
                    <Toast testId={toastTestId} ref={toastRef} {...props} />
                ),
                ...options,
            }),
            [options, toastRef],
        ),
    );

    return { toast, anchorRef };
};

export type ToastFunction = ReturnType<typeof useToast>['toast'];
