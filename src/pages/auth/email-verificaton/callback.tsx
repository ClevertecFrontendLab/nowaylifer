import { Navigate, useSearchParams } from 'react-router';

import { RoutePath } from '~/shared/router';

import { EmailVerificationHistoryState } from './email-verification-history-state';

const parseBoolean = (string: string) => {
    if (string === 'true') {
        return true;
    } else if (string === 'false') {
        return false;
    }
    return null;
};

export const EmailVerificationCallback = () => {
    const [searchParams] = useSearchParams();
    const param = searchParams.get('emailVerified');
    const isSuccess = typeof param === 'string' && parseBoolean(param);

    if (isSuccess == null) {
        return <Navigate to={RoutePath.Login} />;
    }

    return (
        <Navigate
            to={isSuccess ? RoutePath.Login : RoutePath.Signup}
            state={{ emailVerified: isSuccess } satisfies EmailVerificationHistoryState}
        />
    );
};
