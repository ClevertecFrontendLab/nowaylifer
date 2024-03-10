import { useContext } from 'react';
import { AppLoaderContext } from './app-loader-provider';
import invariant from 'invariant';

export const useAppLoader = () => {
    const context = useContext(AppLoaderContext);
    invariant(context, 'Out of AppLoader context');
    return context;
};
