import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { ChangePasswordPayload, useChangePasswordMutation, useRetryMutation } from '@redux/auth';
import { Button, Form, Input } from 'antd';

import { PasswordFormItem } from '../../../components/password-form-item';
import { confirmPassword, required } from '../../../utils/validation-rules';
import { AuthCard } from '../ui/auth-card';

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
                initialValues={retry.shouldRetry ? retry.data : undefined}
                onFinish={changePassword}
            >
                <PasswordFormItem
                    inputProps={{ 'data-test-id': 'change-password' }}
                    name='password'
                    required={true}
                />
                <Form.Item
                    className={styles.ConfirmPwd}
                    dependencies={['password']}
                    name='confirmPassword'
                    rules={[required, confirmPassword()]}
                >
                    <Input.Password
                        data-test-id='change-confirm-password'
                        placeholder='Повторите пароль'
                        size='large'
                    />
                </Form.Item>
                <Button
                    block={true}
                    data-test-id='change-submit-button'
                    htmlType='submit'
                    size='large'
                    type='primary'
                >
                    Сохранить
                </Button>
            </Form>
        </AuthCard>
    );
};
