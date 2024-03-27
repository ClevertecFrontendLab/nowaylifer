export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];
export const RoutePath = {
    Root: '/',
    Main: '/main',
    Login: '/auth',
    Register: '/auth/registration',
    ConfirmEmail: '/auth/confirm-email',
    ChangePassword: '/auth/change-password',
    Result: '/result',
    Feedback: '/feedbacks',
    Calendar: '/calendar',
    Profile: '/profile',
    Settings: '/settings',
} as const;
