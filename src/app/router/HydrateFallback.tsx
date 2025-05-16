import { useShowAppLoader } from '~/shared/infra/app-loader';

export const HydrateFallback = () => {
    useShowAppLoader(true, false);
    return null;
};
