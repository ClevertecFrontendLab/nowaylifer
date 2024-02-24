import { Form, Input, Button, Checkbox } from 'antd';
import styles from './login-form.module.less';
import { GooglePlusOutlined } from '@ant-design/icons';
import { email, password, required } from '../../validation-rules';
import { useCheckEmailMutation, useLoginMutation, useRetryMutation } from '@redux/auth';
import type { UserCredentials } from 'src/types';
import { useState, memo } from 'react';
import cn from 'classnames';
import { useXs } from '@hooks/use-breakpoint';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';

type FormValues = UserCredentials & {
    remember: boolean;
};

export const LoginForm = memo(function LoginForm() {
    const [emailValid, setEmailValid] = useState(false);
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm<FormValues>();
    const [login] = useLoginMutation();
    const retry = useAppSelector((state) => state.auth.retryCheckEmail);
    const xs = useXs();

    useRetryMutation(checkEmail, retry);

    const handleResetPassword = () => {
        checkEmail(form.getFieldValue('email'));
    };

    return (
        <Form
            className={styles.Form}
            form={form}
            onFinish={login}
            onFieldsChange={() =>
                setEmailValid(
                    form.isFieldTouched('email') && form.getFieldError('email').length === 0,
                )
            }
        >
            <Form.Item
                name='email'
                rules={[required, email]}
                initialValue={retry.shouldRetry ? retry.data : undefined}
            >
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>

            <Form.Item name='password' rules={[required, password]}>
                <Input.Password size='large' placeholder='Пароль' />
            </Form.Item>

            <div className={styles.RememberWrap}>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Button
                    className={styles.RestorePasswordBtn}
                    type='link'
                    disabled={!emailValid}
                    onClick={handleResetPassword}
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
