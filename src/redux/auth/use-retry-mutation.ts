import type { RetryField } from '@redux/auth';
import { useEffect } from 'react';

export const useRetryMutation = <Arg>(
    trigger: (arg: Arg) => { abort: () => void },
    retry: RetryField<Arg>,
    delay = 100,
) => {
    useEffect(() => {
        let request: ReturnType<typeof trigger>;
        let timeoutId: number;

        if (retry.shouldRetry) {
            timeoutId = window.setTimeout(() => {
                request = trigger(retry.data);
            }, delay);
        }

        return () => {
            window.clearTimeout(timeoutId);
            request?.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [retry.shouldRetry, trigger, delay]);
};
