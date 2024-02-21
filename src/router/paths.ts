export type Path = (typeof Path)[keyof typeof Path];
export const Path = {
    Root: '/',
    Main: '/main',
    Login: '/auth',
    Register: '/auth/registration',
    ConfirmEmail: 'auth/confirm-email',
    ChangePassword: 'auth/change-password',
    Result: '/result',
} as const;
