import { LoaderFunction, LoaderFunctionArgs, replace } from 'react-router';

const defaultShouldNavigateFn = (_error: unknown, args: LoaderFunctionArgs) =>
    args.request.url === window.location.href;

type LoaderShouldNavigateOnErrorFunction = (
    error: unknown,
    args: LoaderFunctionArgs,
    defaultShouldNavigate: typeof defaultShouldNavigateFn,
) => boolean;

export const createRouteLoader =
    (
        loader: LoaderFunction,
        shouldNavigateOnError:
            | LoaderShouldNavigateOnErrorFunction
            | boolean = defaultShouldNavigateFn,
    ) =>
    async (args: LoaderFunctionArgs) => {
        try {
            return await loader(args);
        } catch (error) {
            const shouldNavigate =
                typeof shouldNavigateOnError === 'function'
                    ? shouldNavigateOnError(error, args, defaultShouldNavigateFn)
                    : shouldNavigateOnError;

            if (shouldNavigate) throw error;
            return replace(window.location.href);
        }
    };
