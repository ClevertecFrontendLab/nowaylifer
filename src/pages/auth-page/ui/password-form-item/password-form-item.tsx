import { Form, Input, InputProps } from 'antd';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { password, required } from '../../validation-rules';
import styles from './password-form-item.module.less';

type ValidateStatus = ReturnType<typeof Form.Item.useStatus>['status'];

type PasswordInputProps = InputProps & {
    onValidate?: (status?: ValidateStatus) => void;
};

const PasswordInput = ({ onValidate, ...props }: PasswordInputProps) => {
    const { status } = Form.Item.useStatus();

    useEffect(() => {
        onValidate?.(status);
    }, [onValidate, status]);

    return <Input.Password size='large' placeholder='Пароль' {...props}  />;
};

export type PasswordFormItemProps = {
    className?: string;
    name?: string;
    inputProps?: InputProps;
};

export const PasswordFormItem = ({ className, name, inputProps }: PasswordFormItemProps) => {
    const [validateStatus, setValidateStatus] = useState<ValidateStatus>();

    return (
        <Form.Item
            className={cn(
                validateStatus === 'error' && styles.ExtraErrorColor,
                styles.FormItem,
                className,
            )}
            name={name}
            rules={[required, password]}
            extra='Пароль не менее 8 символов, с заглавной буквой и цифрой'
        >
            <PasswordInput onValidate={setValidateStatus} {...inputProps} />
        </Form.Item>
    );
};
