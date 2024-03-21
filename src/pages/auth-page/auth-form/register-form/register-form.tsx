import { memo } from 'react';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useXs } from '@hooks/use-breakpoint';
import { PasswordFormItem } from '@pages/auth-page/ui/password-form-item';
import { UserCredentials, useRegisterMutation, useRetryMutation } from '@redux/auth';
import { loginViaGoogle } from '@redux/auth/actions';
import { Button, Form, Input } from 'antd';
import cn from 'classnames';

import * as rules from '../../validation-rules';

import styles from './register-form.module.less';

type FormValues = UserCredentials & { confirmPassword: string };

export const RegisterForm = memo(() => {
    const [form] = Form.useForm<FormValues>();
    const [register] = useRegisterMutation();
    const retry = useAppSelector((state) => state.auth.retryRegister);
    const xs = useXs();
    const dispatch = useAppDispatch();

    const authGoogle = () => {
        dispatch(loginViaGoogle(form.getFieldValue('remember')));
    };

    const handleFinish = ({ email, password }: FormValues) => {
        register({ email, password });
    };

    useRetryMutation(register, retry);

    return (
        <Form
            className={styles.Form}
            form={form}
            initialValues={retry.shouldRetry ? retry.data : undefined}
            onFinish={handleFinish}
        >
            <Form.Item name='email' rules={[rules.required, rules.email]}>
                <Input addonBefore='e-mail:' data-test-id='registration-email' size='large' />
            </Form.Item>

            <PasswordFormItem
                inputProps={{ 'data-test-id': 'registration-password' }}
                name='password'
            />

            <Form.Item
                className={styles.ConfirmPwd}
                dependencies={['password']}
                name='confirmPassword'
                rules={[rules.required, rules.confirmPassword()]}
            >
                <Input.Password
                    data-test-id='registration-confirm-password'
                    placeholder='Повторите пароль'
                    size='large'
                />
            </Form.Item>

            <Button
                block={true}
                className={cn(styles.Btn, styles.RegisterBtn)}
                data-test-id='registration-submit-button'
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
                Регистрация через Google
            </Button>
        </Form>
    );
});
