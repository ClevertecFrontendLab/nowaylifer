import { Navigate, useRouteError } from 'react-router';

import { isClientError } from '~/shared/api/util';
import { RoutePath } from '~/shared/router';

export const NavigateOnError = () => {
    const error = useRouteError();
    return <Navigate to={isClientError(error) ? RoutePath.NotFound : RoutePath.Main} />;
};
