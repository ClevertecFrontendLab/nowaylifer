import { useInvariantContext } from '@hooks/use-invariant-context';

import { AppLoaderContext } from './app-loader-provider';

export const useAppLoader = () => useInvariantContext(AppLoaderContext);
