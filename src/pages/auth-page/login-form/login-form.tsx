import { Form, Input, Button, Checkbox } from 'antd';
import styles from './login-form.module.less';
import { GooglePlusOutlined } from '@ant-design/icons';
import { email, required } from '../validation-rules';
import { useCheckEmailMutation, useLoginMutation } from '@redux/auth';
import type { UserCredentials } from 'src/types';
import { useState, memo } from 'react';

type FormValues = UserCredentials & {
    remember: boolean;
};

export const LoginForm = memo(function LoginForm() {
    const [form] = Form.useForm<FormValues>();
    const [login] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();
    const [formValid, setFormValid] = useState(false);

    const handleFinish = ({ email, password, remember }: FormValues) => {
        login({ email, password, remember });
    };

    const handleResetPassword = () => {
        checkEmail(form.getFieldValue('email'));
    };

    return (
        <Form
            className={styles.Form}
            form={form}
            onFinish={handleFinish}
            onFieldsChange={() =>
                setFormValid(form.getFieldsError().every((item) => item.errors.length === 0))
            }
        >
            <Form.Item name='email' rules={[required, email]}>
                <Input addonBefore='e-mail:' size='large' />
            </Form.Item>

            <Form.Item name='password' rules={[required]}>
                <Input.Password size='large' placeholder='Пароль' />
            </Form.Item>

            <div className={styles.RememberWrap}>
                <Form.Item name='remember' valuePropName='checked'>
                    <Checkbox>Запомнить меня</Checkbox>
                </Form.Item>
                <Button
                    className={styles.RestorePasswordBtn}
                    type='link'
                    disabled={!formValid}
                    onClick={handleResetPassword}
                >
                    Забыли пароль?
                </Button>
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
});
