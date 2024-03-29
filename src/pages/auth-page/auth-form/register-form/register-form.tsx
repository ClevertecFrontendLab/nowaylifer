import { GooglePlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useXs } from '@hooks/use-breakpoint';
import { PasswordFormItem } from '@pages/auth-page/ui/password-form-item';
import { UserCredentials, useRegisterMutation, useRetryMutation } from '@redux/auth';
import { Button, Form, Input } from 'antd';
import cn from 'classnames';
import { memo } from 'react';
import { confirmPassword, email, required } from '../../validation-rules';
import styles from './register-form.module.less';
import { loginViaGoogle } from '@redux/auth/actions';

type FormValues = UserCredentials & { confirmPassword: string };

export const RegisterForm = memo(function RegisterForm() {
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
            onFinish={handleFinish}
            initialValues={retry.shouldRetry ? retry.data : undefined}
        >
            <Form.Item name='email' rules={[required, email]}>
                <Input addonBefore='e-mail:' size='large' data-test-id='registration-email' />
            </Form.Item>

            <PasswordFormItem
                name='password'
                inputProps={{ 'data-test-id': 'registration-password' }}
            />

            <Form.Item
                className={styles.ConfirmPwd}
                name='confirmPassword'
                dependencies={['password']}
                rules={[required, confirmPassword()]}
            >
                <Input.Password
                    size='large'
                    placeholder='Повторите пароль'
                    data-test-id='registration-confirm-password'
                />
            </Form.Item>

            <Button
                className={cn(styles.Btn, styles.RegisterBtn)}
                type='primary'
                htmlType='submit'
                size='large'
                block
                data-test-id='registration-submit-button'
            >
                Войти
            </Button>
            <Button
                className={styles.Btn}
                block
                htmlType='button'
                size='large'
                icon={xs ? undefined : <GooglePlusOutlined />}
                onClick={authGoogle}
            >
                Регистрация через Google
            </Button>
        </Form>
    );
});
