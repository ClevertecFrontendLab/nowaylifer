import { GooglePlusOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import styles from './register-form.module.less';
import { email, password, required } from '../validation-rules';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

export const RegisterForm = () => {
    const [form] = Form.useForm<FormValues>();

    return (
        <Form className={styles.Form} form={form} onFinish={(values) => console.log(values)}>
            <Form.Item name='email' rules={[required, email]}>
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>

            <Form.Item
                className={styles.Pwd}
                name='password'
                rules={[required, password]}
                extra={'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
            >
                <Input.Password size='large' placeholder='Пароль' />
            </Form.Item>

            <Form.Item className={styles.ConfirmPwd} name='confirmPassword'>
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
