import { PropsWithChildren } from 'react';
import { useNavigation } from 'react-router';

import { useAppLoader } from '~/shared/infra/app-loader';

export const AppLoaderWhileNavigating = ({ children }: PropsWithChildren) => {
    const { state } = useNavigation();
    useAppLoader(state === 'loading');
    return children;
};
