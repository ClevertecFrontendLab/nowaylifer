import { useLatestRef } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

export interface UseScrollToHashProps extends ScrollIntoViewOptions {}

export const useScrollToHash = (options: UseScrollToHashProps = {}) => {
    const optionsRef = useLatestRef(options);
    const { hash } = useLocation();

    useEffect(() => {
        if (!hash) return;

        const id = hash.slice(1);
        const el = document.getElementById(id);

        if (el) el.scrollIntoView(optionsRef.current);
    }, [hash, optionsRef]);
};
