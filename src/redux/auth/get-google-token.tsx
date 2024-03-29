import { useDispatch } from 'react-redux';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

import { setToken } from '.';

export const GetGoogleToken = () => {
    const [searchParams] = useSearchParams();
    const remember = useAppSelector((state) => state.auth.rememberGoogleAuth);
    const dispatch = useDispatch();
    const token = searchParams.get('accessToken');

    if (token) dispatch(setToken({ token, remember }));

    return <Outlet />;
};
