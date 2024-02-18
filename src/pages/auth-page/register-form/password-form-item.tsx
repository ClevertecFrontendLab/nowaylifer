import { Form, Input } from 'antd';
import { password } from '../validation-rules';
import { useEffect, useState } from 'react';

type ValidateStatus = ReturnType<typeof Form.Item.useStatus>['status'];

export const PasswordInput = ({
    onValidate,
}: {
    onValidate?: (status?: ValidateStatus) => void;
}) => {
    const { status } = Form.Item.useStatus();

    useEffect(() => {
        onValidate?.(status);
    }, [onValidate, status]);

    return <Input.Password size='large' placeholder='Пароль' />;
};

export const PasswordFormItem = ({ className }: { className?: string }) => {
    const [validateStatus, setValidateStatus] = useState<ValidateStatus>('');

    return (
        <Form.Item
            className={className}
            name='password'
            rules={[password]}
            extra={
                validateStatus === 'error'
                    ? null
                    : 'Пароль не менее 8 символов, с заглавной буквой и цифрой'
            }
        >
            <PasswordInput onValidate={setValidateStatus} />
        </Form.Item>
    );
};
