import invariant from 'invariant';
import { redirect } from 'react-router';

import { blogApi } from '~/entities/blog';
import { isClientError } from '~/shared/api/util';
import { createRouteLoader, RouteParam, RoutePath, storeContext } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session';

export const blogPageLoader = createRouteLoader(async ({ context, params }) => {
    const { dispatch, getState } = context.get(storeContext);
    const { userId } = selectSessionDataInvariant(getState());
    const bloggerId = params[RouteParam.UserId];

    invariant(bloggerId, `${RouteParam.UserId} param is empty string or undefined`);

    const result = await dispatch(
        blogApi.endpoints.blog.initiate({ bloggerId, currentUserId: userId }, { subscribe: false }),
    );

    if (result.error) {
        if (isClientError(result.error)) {
            return redirect(RoutePath.NotFound);
        }
        throw result.error;
    }

    return result.data!;
});
