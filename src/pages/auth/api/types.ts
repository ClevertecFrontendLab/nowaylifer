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
