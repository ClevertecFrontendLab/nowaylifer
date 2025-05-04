import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

import { TestId } from '~/shared/test-ids';
import { Toast } from '~/shared/ui/Toast';
import { toast } from '~/shared/util';

export const rtkQueryErrorLogger: Middleware = (_api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        if (!toast.isActive('serverError')) {
            toast({
                id: 'serverError',
                title: 'Ошибка сервера',
                description: 'Попробуйте поискать снова попозже',
                status: 'error',
                isClosable: true,
                render: ({ position: _, ...props }) => (
                    <Toast
                        data-test-id={TestId.ERROR_ALERT}
                        closeButtonProps={{ 'data-test-id': TestId.ERROR_ALERT_CLOSE }}
                        {...props}
                    />
                ),
            });
        }
    }

    return next(action);
};
