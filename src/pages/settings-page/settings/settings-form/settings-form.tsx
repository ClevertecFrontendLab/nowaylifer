import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useXss } from '@hooks/use-breakpoint';
import { selectUser, useEditCurrentUserMutation, User } from '@redux/user';
import { Form, FormProps, Switch, Typography } from 'antd';
import { LabelTooltipType } from 'antd/es/form/FormItemLabel';
import cn from 'classnames';
import invariant from 'invariant';

import styles from './settings-form.module.less';

type FormValues = Pick<User, 'sendNotification' | 'readyForJointTraining'> & {
    isBlackTheme: boolean;
};

const tooltipConfig: LabelTooltipType = {
    icon: <ExclamationCircleOutlined />,
    align: { offset: [-16] },
    placement: 'bottomLeft',
};

export const SettingsForm = ({ className, ...props }: FormProps) => {
    const [editUser] = useEditCurrentUserMutation();
    const [form] = Form.useForm<FormValues>();
    const user = useAppSelector(selectUser);
    const xss = useXss();

    const isBlackThemeDisabled = !user?.tariff;

    const handleValuesChange = (changedValues: Partial<FormValues>, values: FormValues) => {
        if ('sendNotification' in changedValues || 'readyForJointTraining' in changedValues) {
            const { isBlackTheme, ...rest } = values;

            invariant(user, 'User is undefined');
            editUser({ ...user, ...rest });
        }
    };

    return (
        <Form
            className={cn(styles.Form, className)}
            colon={false}
            form={form}
            onValuesChange={handleValuesChange}
            {...props}
        >
            <Form.Item<FormValues>
                initialValue={user?.readyForJointTraining}
                label={<span>Открыт для совместных {xss && <br />} тренировок</span>}
                name='readyForJointTraining'
                tooltip={{
                    ...tooltipConfig,
                    icon: (
                        <ExclamationCircleOutlined
                            style={xss ? { position: 'relative', bottom: 11 } : undefined}
                        />
                    ),
                    title: 'включенная функция позволит участвовать в совместных тренировках',
                    overlayStyle: { maxWidth: 205 },
                }}
                valuePropName='checked'
            >
                <Switch size={xss ? 'small' : 'default'} />
            </Form.Item>
            <Form.Item<FormValues>
                initialValue={user?.sendNotification}
                label='Уведомления'
                name='sendNotification'
                tooltip={{
                    ...tooltipConfig,
                    title: 'включенная функция позволит получать уведомления об активностях',
                    overlayStyle: { maxWidth: 219 },
                }}
                valuePropName='checked'
            >
                <Switch size={xss ? 'small' : 'default'} />
            </Form.Item>
            <Form.Item<FormValues>
                initialValue={false}
                label={
                    <Typography.Text
                        style={{
                            color: isBlackThemeDisabled
                                ? 'var(--character-light-disable-25)'
                                : undefined,
                        }}
                    >
                        Тёмная тема
                    </Typography.Text>
                }
                name='isBlackTheme'
                tooltip={{
                    ...tooltipConfig,
                    title: 'тёмная тема доступна для PRO tariff',
                    overlayStyle: { maxWidth: 113 },
                }}
                valuePropName='checked'
            >
                <Switch disabled={isBlackThemeDisabled} size={xss ? 'small' : 'default'} />
            </Form.Item>
        </Form>
    );
};
