import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { Card } from '@components/card';
import { Button } from 'antd';
import cn from 'classnames';

import styles from './download-app-card.module.less';

export type DownloadAppCardProps = {
    className?: string;
};

export const DownloadAppCard = ({ className }: DownloadAppCardProps) => (
    <Card
        className={cn(styles.DownloadAppCard, className)}
        title={
            <div className={styles.Title}>
                <a>Скачать на телефон</a>
                Доступно в PRO-тарифе
            </div>
        }
    >
        <Button className={styles.Button} icon={<AndroidFilled />}>
            Android OS
        </Button>
        <Button className={styles.Button} icon={<AppleFilled />}>
            Apple iOS
        </Button>
    </Card>
);
