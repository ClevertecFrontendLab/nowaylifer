export type UserCredentials = {
    email: string;
    password: string;
};

export type ChangePasswordPayload = {
    password: UserCredentials['password'];
    confirmPassword: UserCredentials['password'];
};

export type LoginResponse = {
    accessToken: string;
};

export type ResultStatus =
    | 'error-login'
    | 'error-user-exist'
    | 'error'
    | 'success'
    | 'error-check-email-no-exist'
    | 'error-check-email'
    | 'error-change-password'
    | 'success-change-password';
