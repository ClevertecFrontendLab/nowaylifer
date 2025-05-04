import { Outlet, useNavigation } from 'react-router';

import { useShowAppLoader } from '~/widgets/app-loader';

export const AppLoaderOnNavigation = () => {
    const navigation = useNavigation();
    useShowAppLoader(navigation.state === 'loading');
    return <Outlet />;
};
