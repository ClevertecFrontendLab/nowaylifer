import { useEffect, useState } from 'react';
import { Form, Input, InputProps } from 'antd';
import cn from 'classnames';

import { password, required as requiredRule } from '../../utils/validation-rules';

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

    return <Input.Password placeholder='Пароль' size='large' {...props} />;
};

export type PasswordFormItemProps = {
    name?: string;
    required?: boolean;
    className?: string;
    inputProps?: InputProps;
};

export const PasswordFormItem = ({
    name,
    className,
    inputProps,
    required = false,
}: PasswordFormItemProps) => {
    const [validateStatus, setValidateStatus] = useState<ValidateStatus>();

    return (
        <Form.Item
            className={cn(
                validateStatus === 'error' && styles.ExtraErrorColor,
                styles.FormItem,
                className,
            )}
            extra='Пароль не менее 8 символов, с заглавной буквой и цифрой'
            name={name}
            rules={required ? [requiredRule, password] : [password]}
        >
            <PasswordInput onValidate={setValidateStatus} {...inputProps} />
        </Form.Item>
    );
};
