import { Navigate, useRouteError } from 'react-router';

import { RoutePath } from '~/shared/router';
import { isFetchBaseQueryError } from '~/shared/store';

export const NotFoundErrorBoundary = () => {
    const error = useRouteError();
    if (
        isFetchBaseQueryError(error) &&
        typeof error.status === 'number' &&
        error.status >= 400 &&
        error.status < 500
    ) {
        return <Navigate to={RoutePath.NotFound} />;
    }
    throw error;
};
