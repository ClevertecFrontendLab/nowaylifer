import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useConfirmEmailMutation } from '@redux/auth';
import { Result } from 'antd';
import cn from 'classnames';
import invariant from 'invariant';
import { useEffect, useRef, useState } from 'react';
import VerificationInput from 'react-verification-input';
import { AuthCard } from '../ui/auth-card';
import styles from './confirm-email.module.less';

export const ConfirmEmail = () => {
    const email = useAppSelector((state) => state.auth.emailToConfirm);
    const [confirmEmail, { isError }] = useConfirmEmailMutation();
    const [otp, setOtp] = useState('');
    const errorRef = useRef(isError);

    invariant(email, 'Email is undefined');

    const handleComplete = (otp: string) => {
        setOtp('');
        confirmEmail({ email, code: otp });
    };

    useEffect(() => {
        errorRef.current = isError;
    }, [isError]);

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
            <VerificationInput
                placeholder=''
                validChars='0-9'
                value={otp}
                onChange={setOtp}
                onComplete={handleComplete}
                inputProps={{ 'data-test-id': 'verification-input' }}
                classNames={{
                    container: styles.WrapperOTP,
                    character: cn(
                        'ant-input',
                        errorRef.current && 'ant-input-status-error',
                        styles.InputOTP,
                    ),
                }}
            />
            <p className={styles.Para}>Не пришло письмо? Проверьте папку Спам.</p>
        </AuthCard>
    );
};
