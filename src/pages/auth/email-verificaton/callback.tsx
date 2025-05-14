import { Navigate, useSearchParams } from 'react-router';

import { RoutePath } from '~/shared/router';

import { EmailVerificationHistoryState } from './history-state';

const parseBoolean = (string: string) => {
    switch (string) {
        case 'true':
            return true;
        case 'false':
            return false;
        default:
            return null;
    }
};

export const EmailVerificationCallback = () => {
    const [searchParams] = useSearchParams();
    const param = searchParams.get('emailVerified') ?? '';
    const emailVerified = parseBoolean(param);

    if (emailVerified == null) {
        return <Navigate to={RoutePath.Login} />;
    }

    return (
        <Navigate
            to={emailVerified ? RoutePath.Login : RoutePath.Signup}
            state={{ emailVerified } satisfies EmailVerificationHistoryState}
        />
    );
};
