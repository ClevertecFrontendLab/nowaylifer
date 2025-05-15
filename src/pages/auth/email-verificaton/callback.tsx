import { isBoolean } from 'lodash-es';
import { Navigate, useSearchParams } from 'react-router';

import { RoutePath } from '~/shared/router';

import { EmailVerificationHistoryState } from './history-state';

const parseBoolean = (string: string) => {
    try {
        const parsed = JSON.parse(string);
        return isBoolean(parsed) ? parsed : null;
    } catch {
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
