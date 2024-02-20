import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { useEffect, useRef } from 'react';
import { confirmPassword, email, required } from '../validation-rules';
import { PasswordFormItem } from './password-form-item';
import styles from './register-form.module.less';
import { useRegisterMutation } from '@redux/auth/api';
import { useLocation, type Location } from 'react-router-dom';
import type { UserCredentials } from 'src/types';
import { useAuthLoader } from '../use-auth-loader';

type FormValues = UserCredentials & { confirmPassword: string };

export const RegisterForm = () => {
    const [form] = Form.useForm<FormValues>();
    const [register, { isLoading }] = useRegisterMutation();
    const location = useLocation() as Location<{ retry?: UserCredentials }>;
    const retryPending = useRef(false);
    const retry = location.state?.retry;
    useAuthLoader(isLoading);

    const handleFinish = ({ email, password }: FormValues) => {
        register({ email, password });
    };

    useEffect(() => {
        let request: ReturnType<typeof register>;

        if (retry && !retryPending.current) {
            retryPending.current = true;
            setTimeout(() => {
                request = register(retry);
                request.finally(() => (retryPending.current = false));
            }, 2000);
        }

        return () => request?.abort();
    }, [retry, register]);

    return (
        <Form
            className={styles.Form}
            form={form}
            onFinish={handleFinish}
            {...(retry && {
                initialValues: {
                    email: retry.email,
                    password: retry.password,
                    confirmPassword: retry.password,
                },
            })}
        >
            <Form.Item name='email' rules={[required, email]}>
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>

            <PasswordFormItem name='password' className={styles.Pwd} />

            <Form.Item
                className={styles.ConfirmPwd}
                name='confirmPassword'
                dependencies={['password']}
                rules={[required, confirmPassword('password')]}
            >
                <Input.Password size='large' placeholder='Повторите пароль' />
            </Form.Item>

            <Button
                className={styles.RegisterBtn}
                type='primary'
                htmlType='submit'
                size='large'
                block
            >
                Войти
            </Button>
            <Button icon={<GooglePlusOutlined />} block htmlType='button' size='large'>
                Регистрация через Google
            </Button>
        </Form>
    );
};
