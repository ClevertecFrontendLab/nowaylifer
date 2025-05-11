import { PropsWithChildren } from 'react';
import { useNavigation } from 'react-router';

import { useShowAppLoader } from '~/shared/infra/app-loader';

export const AppLoaderOnNavigation = ({ children }: PropsWithChildren) => {
    const { state } = useNavigation();
    useShowAppLoader(state === 'loading');
    return children;
};
