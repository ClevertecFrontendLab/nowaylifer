import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ChangePasswordPayload, useChangePasswordMutation, useRetryMutation } from '@redux/auth';
import { Button, Form, Input } from 'antd';
import { AuthCard } from '../ui/auth-card';
import { PasswordFormItem } from '../ui/password-form-item';
import { confirmPassword, required } from '../validation-rules';
import styles from './change-password.module.less';

export const ChangePassword = () => {
    const [form] = Form.useForm<ChangePasswordPayload>();
    const [changePassword] = useChangePasswordMutation();
    const retry = useAppSelector((state) => state.auth.retryChangePassword);

    useRetryMutation(changePassword, retry);

    return (
        <AuthCard>
            <h1 className={styles.Title}>Восстановление аккаунта</h1>
            <Form
                form={form}
                onFinish={changePassword}
                initialValues={retry.shouldRetry ? retry.data : undefined}
            >
                <PasswordFormItem
                    name='password'
                    inputProps={{ 'data-test-id': 'change-password' }}
                />
                <Form.Item
                    className={styles.ConfirmPwd}
                    name='confirmPassword'
                    dependencies={['password']}
                    rules={[required, confirmPassword()]}
                >
                    <Input.Password
                        placeholder='Повторите пароль'
                        size='large'
                        data-test-id='change-confirm-password'
                    />
                </Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                    block
                    size='large'
                    data-test-id='change-submit-button'
                >
                    Сохранить
                </Button>
            </Form>
        </AuthCard>
    );
};
