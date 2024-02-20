import { Form, Input, Button, Checkbox } from 'antd';
import styles from './login-form.module.less';
import { GooglePlusOutlined } from '@ant-design/icons';
import { email, required } from '../validation-rules';
import { useLoginMutation } from '@redux/api/auth-api';
import { useAuthLoader } from '../use-auth-loader';
import type { UserCredentials } from 'src/types';

type FormValues = UserCredentials & {
    remember: boolean;
};

export const LoginForm = () => {
    const [form] = Form.useForm<FormValues>();
    const [login, { isLoading }] = useLoginMutation();
    useAuthLoader(isLoading);

    const handleFinish = ({ email, password, remember }: FormValues) => {
        login({ email, password, remember });
    };

    return (
        <Form className={styles.Form} form={form} onFinish={handleFinish}>
            <Form.Item name='email' rules={[required, email]}>
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>

            <Form.Item name='password' rules={[required]}>
                <Input.Password size='large' placeholder='Пароль' />
            </Form.Item>

            <div className={styles.RememberWrap}>
                <Form.Item name='remember' valuePropName='checked' noStyle>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <a href='/'>Забыли пароль?</a>
            </div>

            <Button
                className={styles.LoginButton}
                type='primary'
                htmlType='submit'
                size='large'
                block
            >
                Войти
            </Button>
            <Button icon={<GooglePlusOutlined />} block htmlType='button' size='large'>
                Войти через Google
            </Button>
        </Form>
    );
};
