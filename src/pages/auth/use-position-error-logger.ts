import { usePopper } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useToastErrorLogger } from '~/shared/infra/error-logger';

export const usePositionErrorLogger = (enabled: boolean) => {
    const { referenceRef, popperRef } = usePopper({
        enabled,
        gutter: 0,
        flip: false,
        strategy: 'fixed',
        preventOverflow: false,
        modifiers: [
            { name: 'computeStyles', options: { gpuAcceleration: false } },
            {
                name: 'inner',
                phase: 'main',
                requires: ['popperOffsets'],
                enabled: true,
                fn: ({ state }) => {
                    state.modifiersData.popperOffsets!.y -= state.rects.popper.height;
                },
            },
        ],
    });

    const { setToastOptions } = useToastErrorLogger();

    useEffect(() => {
        if (enabled) {
            setToastOptions({
                ref: (node) => {
                    if (node) {
                        const toastEl = node.closest<HTMLElement>('.chakra-toast');
                        if (toastEl) popperRef(toastEl);
                    } else {
                        popperRef(null);
                    }
                },
            });
        }

        return () => {
            setToastOptions(null);
        };
    }, [enabled, popperRef, setToastOptions]);

    return referenceRef;
};
