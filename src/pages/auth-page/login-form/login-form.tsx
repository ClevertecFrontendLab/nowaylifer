import { Form, Input, Button, Checkbox } from 'antd';
import styles from './login-form.module.less';
import { GooglePlusOutlined } from '@ant-design/icons';
import { email, password, required } from '../validation-rules';
import { useCheckEmailMutation, useLoginMutation } from '@redux/auth';
import type { UserCredentials } from 'src/types';
import { useState, memo, useEffect } from 'react';
import cn from 'classnames';
import { useXs } from '@hooks/use-breakpoint';

type FormValues = UserCredentials & {
    remember: boolean;
};

export const LoginForm = memo(function LoginForm() {
    const [emailValid, setEmailValid] = useState(false);
    const [checkEmail] = useCheckEmailMutation();
    const [form] = Form.useForm<FormValues>();
    const [login] = useLoginMutation();
    const xs = useXs();

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
                setEmailValid(
                    form.isFieldTouched('email') && form.getFieldError('email').length === 0,
                )
            }
        >
            <Form.Item name='email' rules={[required, email]}>
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
