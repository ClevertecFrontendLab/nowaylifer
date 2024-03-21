import { useEffect } from 'react';
import type { RetryField } from '@redux/auth';

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
    }, [retry, trigger, delay]);
};
