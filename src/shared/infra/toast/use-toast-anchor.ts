import { useCallbackRef, usePopper } from '@chakra-ui/react';
import { RefCallback } from 'react';

export const useToastAnchor = (enabled: boolean) => {
    const { referenceRef, popperRef } = usePopper({
        enabled,
        gutter: 0,
        strategy: 'fixed',
        flip: false,
        modifiers: [
            { name: 'computeStyles', options: { gpuAcceleration: false } },
            { name: 'preventOverflow', options: { altAxis: true, tether: false } },
        ],
    });

    const toastRef: RefCallback<HTMLElement> = useCallbackRef((node) => {
        if (node) {
            const toastEl = node.closest<HTMLElement>('.chakra-toast');
            popperRef(toastEl);
        } else {
            popperRef(null);
        }
    });

    return { anchorRef: referenceRef, toastRef };
};
