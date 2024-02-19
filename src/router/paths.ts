export type Path = (typeof Path)[keyof typeof Path];
export const Path = {
    Root: '/',
    Main: '/main',
    Auth: '/auth',
    Register: '/auth/registration',
    Result: '/result/:status',
} as const;
