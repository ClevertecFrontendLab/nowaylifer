import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useXs } from '@hooks/use-breakpoint';
import {
    UserCredentials,
    useCheckEmailMutation,
    useLoginMutation,
    useRetryMutation,
} from '@redux/auth';
import { Button, Checkbox, Form, Input } from 'antd';
import cn from 'classnames';
import { memo, useState } from 'react';
import { email, password, required } from '../../validation-rules';
import styles from './login-form.module.less';

type FormValues = UserCredentials & {
    remember: boolean;
};

export const LoginForm = memo(function LoginForm() {
    const [emailValid, setEmailValid] = useState(true);
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm<FormValues>();
    const [login] = useLoginMutation();
    const retry = useAppSelector((state) => state.auth.retryCheckEmail);
    const xs = useXs();

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
            onFinish={login}
            onFieldsChange={(changedFields) => {
                const emailField = changedFields.find((field) => field.name.includes('email'));
                if (emailField) validateEmail();
            }}
        >
            <Form.Item
                name='email'
                rules={[required, email]}
                validateStatus={emailValid ? 'success' : 'error'}
                initialValue={retry.shouldRetry ? retry.data : undefined}
            >
                <Input addonBefore='e-mail:' size='large' data-test-id='login-email' />
            </Form.Item>

            <Form.Item name='password' rules={[required, password]}>
                <Input.Password size='large' placeholder='Пароль' data-test-id='login-password' />
            </Form.Item>

            <div className={styles.RememberWrap}>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                </Form.Item>
                <Button
                    className={styles.RestorePasswordBtn}
                    type='link'
                    disabled={!emailValid}
                    onClick={handleResetPassword}
                    data-test-id='login-forgot-button'
                >
                    Забыли пароль?
                </Button>
            </div>

            <Button
                className={cn(styles.Btn, styles.LoginButton)}
                type='primary'
                htmlType='submit'
                size='large'
                block
                data-test-id='login-submit-button'
            >
                Войти
            </Button>
            <Button
                className={styles.Btn}
                icon={xs ? undefined : <GooglePlusOutlined />}
                block
                htmlType='button'
                size='large'
            >
                Войти через Google
            </Button>
        </Form>
    );
});
