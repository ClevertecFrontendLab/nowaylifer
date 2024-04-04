import { Alert, AlertProps, notification as notificationAntd } from 'antd';
import { ArgsProps } from 'antd/lib/notification';
import cn from 'classnames';

import styles from './notification.module.less';

type NotifyAlertProps = Omit<ArgsProps, 'message'> & {
    autoClose?: boolean;
    alertProps: AlertProps;
};

const notifyAlert = ({ alertProps, autoClose = false, className, ...props }: NotifyAlertProps) => {
    const key = crypto.randomUUID();

    return notificationAntd.open({
        key,
        duration: autoClose ? undefined : 1e6,
        closeIcon: null,
        placement: 'bottom',
        className: cn(styles.Notification, className),
        message: (
            <Alert
                closable={true}
                onClose={() => notificationAntd.close(key)}
                showIcon={true}
                {...alertProps}
            />
        ),
        ...props,
    });
};

export const notification = Object.assign(notificationAntd, { alert: notifyAlert });
