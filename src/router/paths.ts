export type Path = (typeof Path)[keyof typeof Path];
export const Path = {
    Root: '/',
    Main: '/main',
    Login: '/auth',
    Register: '/auth/registration',
    Result: '/result',
} as const;
