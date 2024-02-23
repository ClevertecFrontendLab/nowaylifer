import styles from './confirm-email.module.less';
import { Result } from 'antd';
import { useConfirmEmailMutation } from '@redux/auth';
import { AuthCard } from '../auth-card';
import OtpInput from 'react-otp-input';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

const OTP_LENGTH = 6;

export const ConfirmEmail = () => {
    const [confirmEmail, { isError }] = useConfirmEmailMutation();
    const email = useAppSelector((state) => state.auth.emailToConfirm);
    const [otp, setOtp] = useState('');
    const errorRef = useRef(isError);

    useEffect(() => {
        if (isError) setOtp('');
        errorRef.current = isError;
    }, [isError]);

    useEffect(() => {
        if (email && otp.length === OTP_LENGTH) {
            confirmEmail({ email, code: otp });
        }
    }, [otp, confirmEmail, email]);

    return (
        <AuthCard className={styles.Card}>
            <Result
                className={styles.Result}
                status={errorRef.current ? 'error' : 'info'}
                title={
                    <div>
                        {errorRef.current ? 'Неверный код. ' : ''}Введите код <br /> для
                        восстановления аккаунта
                    </div>
                }
                subTitle={
                    <div>
                        Мы отправили вам на e-mail <span className={styles.Email}>{email}</span>{' '}
                        шестизначный код. Введите его в поле ниже.
                    </div>
                }
            />
            <OtpInput
                value={otp}
                onChange={setOtp}
                onPaste={(event) => setOtp(event.clipboardData.getData('text'))}
                numInputs={OTP_LENGTH}
                inputType='number'
                containerStyle={styles.WrapperOTP}
                inputStyle={cn(
                    'ant-input',
                    errorRef.current && 'ant-input-status-error',
                    styles.InputOTP,
                )}
                renderInput={(props) => (
                    <input {...props} style={{ ...props.style, width: 40, height: 40 }} />
                )}
            />
            <p className={styles.Para}>Не пришло письмо? Проверьте папку Спам.</p>
        </AuthCard>
    );
};
