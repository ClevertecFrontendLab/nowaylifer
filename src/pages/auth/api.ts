import { HTTPMethod } from 'http-method-enum';

import { ApiEndpoints, apiSlice } from '~/shared/api';

export interface LoginRequestBody {
    login: string;
    password: string;
}

export interface SignupRequestBody extends LoginRequestBody {
    email: string;
    firstName: string;
    lastName: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<void, LoginRequestBody>({
            query: (body) => ({
                url: ApiEndpoints.AUTH_LOGIN,
                method: HTTPMethod.POST,
                body,
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
                    400: (error) => ({ title: error.data.message }),
                },
            },
        }),
    }),
});
