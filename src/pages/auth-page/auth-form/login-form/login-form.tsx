import { memo, useState } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useXs } from '@hooks/use-breakpoint';
import {
    useCheckEmailMutation,
    useLoginMutation,
    UserCredentials,
    useRetryMutation,
} from '@redux/auth';
import { loginViaGoogle } from '@redux/auth/actions';
import { Button, Checkbox, Form, Input } from 'antd';
import cn from 'classnames';

import { email, password, required } from '../../../../utils/validation-rules';

import styles from './login-form.module.less';

type FormValues = UserCredentials & {
    remember: boolean;
};

export const LoginForm = memo(() => {
    const [emailValid, setEmailValid] = useState(true);
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm<FormValues>();
    const [login] = useLoginMutation();
    const retry = useAppSelector((state) => state.auth.retryCheckEmail);
    const xs = useXs();
    const dispatch = useAppDispatch();

    const authGoogle = () => {
        dispatch(loginViaGoogle(form.getFieldValue('remember')));
    };

    useRetryMutation(checkEmail, retry);

    const validateEmail = () => {
        const isValid = form.isFieldTouched('email') && form.getFieldError('email').length === 0;

        setEmailValid(isValid);

        return isValid;
    };

    const handleResetPassword = () => {
        if (validateEmail()) checkEmail(form.getFieldValue('email'));
    };

    return (
        <Form
            className={styles.Form}
            form={form}
            onFieldsChange={(changedFields) => {
                const emailField = changedFields.find((field) => field.name.includes('email'));

                if (emailField) validateEmail();
            }}
            onFinish={login}
        >
            <Form.Item
                initialValue={retry.shouldRetry ? retry.data : undefined}
                name='email'
                rules={[required, email]}
                validateStatus={emailValid ? 'success' : 'error'}
            >
                <Input addonBefore='e-mail:' data-test-id='login-email' size='large' />
            </Form.Item>

            <Form.Item name='password' rules={[required, password]}>
                <Input.Password data-test-id='login-password' placeholder='Пароль' size='large' />
            </Form.Item>

            <div className={styles.RememberWrap}>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>
                <Button
                    className={styles.RestorePasswordBtn}
                    data-test-id='login-forgot-button'
                    disabled={!emailValid}
                    onClick={handleResetPassword}
                    type='link'
                >
                    Забыли пароль?
                </Button>
            </div>

            <Button
                block={true}
                className={cn(styles.Btn, styles.LoginButton)}
                data-test-id='login-submit-button'
                htmlType='submit'
                size='large'
                type='primary'
            >
                Войти
            </Button>
            <Button
                block={true}
                className={styles.Btn}
                htmlType='button'
                icon={xs ? undefined : <GooglePlusOutlined />}
                onClick={authGoogle}
                size='large'
            >
                Войти через Google
            </Button>
        </Form>
    );
});
