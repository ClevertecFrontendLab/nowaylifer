import { useEffect, useRef, useState } from 'react';
import VerificationInput from 'react-verification-input';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useConfirmEmailMutation } from '@redux/auth';
import { Result } from 'antd';
import cn from 'classnames';
import invariant from 'invariant';

import { AuthCard } from '../ui/auth-card';

import styles from './confirm-email.module.less';

export const ConfirmEmail = () => {
    const email = useAppSelector((state) => state.auth.emailToConfirm);
    const [confirmEmail, { isError }] = useConfirmEmailMutation();
    const [otp, setOtp] = useState('');
    const errorRef = useRef(isError);

    invariant(email, 'Email is undefined');

    const handleComplete = (code: string) => {
        setOtp('');
        confirmEmail({ email, code });
    };

    useEffect(() => {
        errorRef.current = isError;
    }, [isError]);

    return (
        <AuthCard className={styles.Card}>
            <Result
                className={styles.Result}
                status={errorRef.current ? 'error' : 'info'}
                subTitle={
                    <div>
                        Мы отправили вам на e-mail <span className={styles.Email}>{email}</span>{' '}
                        шестизначный код. Введите его в поле ниже.
                    </div>
                }
                title={
                    <div>
                        {errorRef.current ? 'Неверный код. ' : ''}Введите код <br /> для
                        восстановления аккаунта
                    </div>
                }
            />
            <VerificationInput
                classNames={{
                    container: styles.WrapperOTP,
                    character: cn(
                        'ant-input',
                        errorRef.current && 'ant-input-status-error',
                        styles.InputOTP,
                    ),
                }}
                inputProps={{ 'data-test-id': 'verification-input' }}
                onChange={setOtp}
                onComplete={handleComplete}
                placeholder=''
                validChars='0-9'
                value={otp}
            />
            <p className={styles.Para}>Не пришло письмо? Проверьте папку Спам.</p>
        </AuthCard>
    );
};
