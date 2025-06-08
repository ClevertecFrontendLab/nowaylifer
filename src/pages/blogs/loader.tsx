import { redirect } from 'react-router';

import { blogApi } from '~/entities/blog';
import { isServerError } from '~/shared/api/util';
import { createRouteLoader, RoutePath, routerContext, storeContext } from '~/shared/router';
import { selectSessionDataInvariant } from '~/shared/session';

export const blogsPageLoader = createRouteLoader(async ({ context }) => {
    const { dispatch, getState } = context.get(storeContext);
    const getRouter = context.get(routerContext);

    const { userId } = selectSessionDataInvariant(getState());

    const result = await dispatch(
        blogApi.endpoints.blogs.initiate({ currentUserId: userId }, { subscribe: false }),
    );

    const isLoading = getRouter().state.navigation.state === 'loading';

    if (isServerError(result.error) && !isLoading) {
        return redirect(RoutePath.Main);
    }

    return result.data!;
});
