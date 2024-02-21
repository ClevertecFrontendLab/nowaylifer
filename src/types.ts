export type UserCredentials = {
    email: string;
    password: string;
};

export type LoginResponse = {
    accessToken: string;
};

export type ResultStatus = 'error-login' | 'error-user-exist' | 'error' | 'success';
