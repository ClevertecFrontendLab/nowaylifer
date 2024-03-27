import { Card } from '@components/card';
import { Tariff } from '@redux/catalogs';
import { Button, Row, Typography } from 'antd';

import styles from './settings.module.less';
import { SettingsForm } from './settings-form';
import { TariffCard } from './tariff-card';

export const Settings = ({ tariffs }: { tariffs: Tariff[] }) => (
    <Card className={styles.TariffInfoCard}>
        <Typography.Title className={styles.Title} level={3}>
            Мой тариф
        </Typography.Title>
        <Row className={styles.CardList}>
            {tariffs.map((tariff) => (
                <TariffCard key={tariff._id} tariff={tariff} />
            ))}
        </Row>
        <SettingsForm className={styles.SettingsForm} />
        <Row className={styles.ButtonsRow}>
            <Button size='large' type='primary'>
                Написать отзыв
            </Button>
            <Button size='large' type='link'>
                Смотреть все отзывы
            </Button>
        </Row>
    </Card>
);
