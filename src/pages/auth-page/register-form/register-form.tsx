import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { memo, useEffect } from 'react';
import { confirmPassword, email, required } from '../validation-rules';
import { PasswordFormItem } from './password-form-item';
import { useRegisterMutation } from '@redux/auth';
import type { UserCredentials } from 'src/types';
import styles from './register-form.module.less';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import cn from 'classnames';
import { useXs } from '@hooks/use-breakpoint';

type FormValues = UserCredentials & { confirmPassword: string };

export const RegisterForm = memo(function RegisterForm() {
    const [form] = Form.useForm<FormValues>();
    const [register] = useRegisterMutation();
    const retry = useAppSelector((state) => state.auth.retryRegister);
    const xs = useXs();

    const handleFinish = ({ email, password }: FormValues) => {
        register({ email, password });
    };

    useEffect(() => {
        let request: ReturnType<typeof register>;
        let timeoutId: number;

        if (retry) {
            timeoutId = window.setTimeout(() => {
                request = register(retry);
            }, 100);
        }

        return () => {
            window.clearTimeout(timeoutId);
            request?.abort();
        };
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
                className={cn(styles.Btn, styles.RegisterBtn)}
                type='primary'
                htmlType='submit'
                size='large'
                block
            >
                Войти
            </Button>
            <Button
                className={styles.Btn}
                block
                htmlType='button'
                size='large'
                icon={xs ? undefined : <GooglePlusOutlined />}
            >
                Регистрация через Google
            </Button>
        </Form>
    );
});
