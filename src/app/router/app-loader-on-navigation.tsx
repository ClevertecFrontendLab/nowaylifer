import { Outlet, useNavigation } from 'react-router';

import { useShowAppLoader } from '~/widgets/app-loader';

export const AppLoaderOnNavigation = () => {
    const { state } = useNavigation();
    useShowAppLoader(state === 'loading');
    return <Outlet />;
};
