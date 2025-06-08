import { isFunction } from 'lodash-es';
import { LoaderFunction, LoaderFunctionArgs, replace } from 'react-router';

import { routerContext } from './route-context';

const defaultShouldNavigateOnError = (_error: unknown, { context }: LoaderFunctionArgs) => {
    const getRouter = context.get(routerContext);
    return getRouter().state.navigation.state === 'idle';
};

type ShouldNavigateOnErrorFunction = (
    error: unknown,
    args: LoaderFunctionArgs,
    defaultShouldNavigate: typeof defaultShouldNavigateOnError,
) => boolean;

export const createRouteLoader =
    (
        loader: LoaderFunction,
        shouldNavigateOnError:
            | ShouldNavigateOnErrorFunction
            | boolean = defaultShouldNavigateOnError,
    ) =>
    async (args: LoaderFunctionArgs) => {
        try {
            return await loader(args);
        } catch (error) {
            const shouldNavigate = isFunction(shouldNavigateOnError)
                ? shouldNavigateOnError(error, args, defaultShouldNavigateOnError)
                : shouldNavigateOnError;

            if (shouldNavigate) throw error;

            const getRouter = args.context.get(routerContext);
            const { search, pathname, hash } = getRouter().state.location;

            return replace(pathname + search + hash);
        }
    };
