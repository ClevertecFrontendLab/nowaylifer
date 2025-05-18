import { noop } from 'lodash-es';

import { ApiEndpoint, apiSlice } from '~/shared/api';
import { ACCESS_TOKEN_HEADER } from '~/shared/config';
import { setToken } from '~/shared/session';
import { HttpMethod } from '~/shared/util';

import { AuthEndpointName } from './endpoint-name';
import { authErrorMetaByStatus } from './error-meta';
import {
    LoginRequestBody,
    RecoverPasswordRequestBody,
    ResetPasswordRequestBody,
    SignupRequestBody,
    VerifyOtpRequestBody,
} from './types';

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        [AuthEndpointName.Login]: build.mutation<void, LoginRequestBody>({
            query: (body) => ({
                url: ApiEndpoint.AUTH_LOGIN,
                method: HttpMethod.POST,
                body,
            }),
            onQueryStarted: (_, { queryFulfilled, dispatch }) =>
                queryFulfilled.then((res) => {
                    const accessToken = res.meta?.response?.headers.get(ACCESS_TOKEN_HEADER);
                    if (accessToken) {
                        dispatch(setToken(accessToken));
                    }
                }, noop),
            extraOptions: { errorMetaByStatus: authErrorMetaByStatus.login },
        }),
        [AuthEndpointName.Signup]: build.mutation<void, SignupRequestBody>({
            query: (body) => ({
                url: ApiEndpoint.AUTH_SIGNUP,
                method: HttpMethod.POST,
                body,
            }),
            extraOptions: { errorMetaByStatus: authErrorMetaByStatus.signup },
        }),
        [AuthEndpointName.RecoverPassword]: build.mutation<void, RecoverPasswordRequestBody>({
            query: (body) => ({
                url: ApiEndpoint.AUTH_FORGOT_PASSWORD,
                method: HttpMethod.POST,
                body,
            }),
            extraOptions: { errorMetaByStatus: authErrorMetaByStatus.recoverPassword },
        }),
        [AuthEndpointName.VerifyOtp]: build.mutation<void, VerifyOtpRequestBody>({
            query: (body) => ({
                url: ApiEndpoint.AUTH_VERIFY_OTP,
                method: HttpMethod.POST,
                body,
            }),
        }),
        [AuthEndpointName.ResetPassword]: build.mutation<void, ResetPasswordRequestBody>({
            query: (body) => ({
                url: ApiEndpoint.AUTH_RESET_PASSWORD,
                method: HttpMethod.POST,
                body,
            }),
        }),
    }),
});
