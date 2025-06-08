import { useToast as useToastBase, UseToastOptions as BaseUseToastOptions } from '@chakra-ui/react';
import { useMemo } from 'react';

import { isE2E } from '~/shared/util';

import { Toast, ToastTestId } from './toast';
import { useToastAnchor } from './use-toast-anchor';

export interface ToastOptions extends BaseUseToastOptions {
    isAnchored?: boolean;
    testId?: Partial<ToastTestId>;
}

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
                    <Toast ref={toastRef} {...props} />
                ),
                ...options,
            }),
            [options, toastRef],
        ),
    );

    return { toast, anchorRef };
};

export type ToastFunction = ReturnType<typeof useToast>['toast'];
