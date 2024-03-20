import { AppLoaderContext } from './app-loader-provider';
import { useInvariantContext } from '@hooks/use-invariant-context';

export const useAppLoader = () => useInvariantContext(AppLoaderContext);
