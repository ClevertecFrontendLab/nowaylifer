import { useAppLoader } from '~/shared/infra/app-loader';

export const HydrateFallback = () => {
    useAppLoader(true, false);
    return null;
};
