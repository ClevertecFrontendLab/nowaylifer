import { HTTPMethod } from 'http-method-enum';

import { ApiEndpoints, apiSlice, isQueryApiError } from '~/shared/api';
import { setToken } from '~/shared/session';

export interface LoginRequestBody {
    login: string;
    password: string;
}

export interface SignupRequestBody extends LoginRequestBody {
    email: string;
    firstName: string;
    lastName: string;
}

export interface RecoverPasswordRequestBody {
    email: string;
}

export interface VerifyOtpRequestBody {
    email: string;
    otpToken: string;
}

export interface ResetPasswordRequestBody {
    login: string;
    password: string;
    passwordConfirm: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<void, LoginRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_LOGIN,
                method: HTTPMethod.POST,
                body,
            }),
            onQueryStarted: (_, { queryFulfilled, dispatch }) =>
                queryFulfilled.then((res) => {
                    const accessToken = res.meta?.response?.headers.get('Authentication-Access');
                    if (accessToken) {
                        dispatch(setToken(accessToken));
                    }
                }),
            extraOptions: {
                errorLogInfoByStatus: {
                    default: null,
                    401: { title: 'Неверный логин или пароль', description: 'Попробуйте снова' },
                    403: {
                        title: 'E-mail не верифицирован',
                        description: 'Проверьте почту и перейдите по ссылке',
                    },
                },
            },
        }),
        signup: build.mutation<void, SignupRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_SIGNUP,
                method: HTTPMethod.POST,
                body,
            }),
            extraOptions: {
                errorLogInfoByStatus: {
                    400: (error) => (isQueryApiError(error) ? { title: error.data.message } : null),
                },
            },
        }),
        recoverPassword: build.mutation<void, RecoverPasswordRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_FORGOT_PASSWORD,
                method: HTTPMethod.POST,
                body,
            }),
            extraOptions: {
                errorLogInfoByStatus: {
                    403: {
                        title: 'Такого e-mail нет',
                        description:
                            'Попробуйте другой e-mail или проверьте правильность его написания',
                    },
                },
            },
        }),
        verifyOtp: build.mutation<void, VerifyOtpRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_VERIFY_OTP,
                method: HTTPMethod.POST,
                body,
            }),
        }),
        resetPassword: build.mutation<void, ResetPasswordRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_RESET_PASSWORD,
                method: HTTPMethod.POST,
                body,
            }),
        }),
    }),
});
