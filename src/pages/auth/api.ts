import { ApiEndpoints, apiSlice, isQueryApiError } from '~/shared/api';
import { ACCESS_TOKEN_HEADER } from '~/shared/config';
import { setToken } from '~/shared/session';
import { HttpMethod, HttpStatusCode } from '~/shared/util';

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
                method: HttpMethod.POST,
                body,
            }),
            onQueryStarted: (_, { queryFulfilled, dispatch }) =>
                queryFulfilled.then((res) => {
                    const accessToken = res.meta?.response?.headers.get(ACCESS_TOKEN_HEADER);
                    if (accessToken) {
                        dispatch(setToken(accessToken));
                    }
                }),
            extraOptions: {
                errorMetaByStatus: {
                    default: null,
                    [HttpStatusCode.UNAUTHORIZED]: {
                        title: 'Неверный логин или пароль',
                        description: 'Попробуйте снова',
                    },
                    [HttpStatusCode.FORBIDDEN]: {
                        title: 'E-mail не верифицирован',
                        description: 'Проверьте почту и перейдите по ссылке',
                    },
                },
            },
        }),
        signup: build.mutation<void, SignupRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_SIGNUP,
                method: HttpMethod.POST,
                body,
            }),
            extraOptions: {
                errorMetaByStatus: {
                    [HttpStatusCode.BAD_REQUEST]: (error) =>
                        isQueryApiError(error) ? { title: error.data.message } : null,
                },
            },
        }),
        recoverPassword: build.mutation<void, RecoverPasswordRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_FORGOT_PASSWORD,
                method: HttpMethod.POST,
                body,
            }),
            extraOptions: {
                errorMetaByStatus: {
                    [HttpStatusCode.FORBIDDEN]: {
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
                method: HttpMethod.POST,
                body,
            }),
        }),
        resetPassword: build.mutation<void, ResetPasswordRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_RESET_PASSWORD,
                method: HttpMethod.POST,
                body,
            }),
        }),
    }),
});
