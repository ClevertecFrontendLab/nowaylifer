import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { confirmPassword, email, required } from '../validation-rules';
import { PasswordFormItem } from './password-form-item';
import styles from './register-form.module.less';
import { useRegisterMutation } from '@redux/api/auth-api';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterForm = () => {
    const [form] = Form.useForm<FormValues>();
    const [register] = useRegisterMutation();

    const handleFinish = ({ email, password }: FormValues) => {
        register({ email, password });
    };

    return (
        <Form className={styles.Form} form={form} onFinish={handleFinish}>
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
                block
                type='primary'
                htmlType='submit'
                size='large'
            >
                Войти
            </Button>
            <Button icon={<GooglePlusOutlined />} block htmlType='button' size='large'>
                Регистрация через Google
            </Button>
        </Form>
    );
};
