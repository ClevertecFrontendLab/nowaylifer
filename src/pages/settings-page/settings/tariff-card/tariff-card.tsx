import { CheckOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { FREE_TARIFF_ID, Tariff } from '@redux/catalogs';
import { selectUser } from '@redux/user';
import { Button, Row, Typography } from 'antd';
import moment from 'moment';

import styles from './tariff-card.module.less';

type TariffCardProps = {
    tariff: Tariff;
    onDetailsClick?(tariff: Tariff): void;
};

export const TariffCard = ({ tariff, onDetailsClick }: TariffCardProps) => {
    const user = useAppSelector(selectUser);

    const isFreeTariff = tariff._id === FREE_TARIFF_ID;
    const isActive = user?.tariff && user.tariff.tariffId === tariff._id;

    let footer;

    if (isFreeTariff) {
        footer = (
            <Typography.Text className={styles.Active}>
                активен <CheckOutlined style={{ marginLeft: 8 }} />
            </Typography.Text>
        );
    } else if (isActive) {
        footer = (
            <Typography.Text className={styles.Active}>
                активен <br /> до {moment(user.tariff?.expired).local().format('DD.MM')}
            </Typography.Text>
        );
    } else {
        footer = (
            <Button size='large' style={{ fontSize: 14 }} type='primary'>
                Активировать
            </Button>
        );
    }

    return (
        <Card className={styles.Card}>
            <Card.Header className={styles.CardHeader}>
                <Row align='middle' justify='space-between'>
                    <Typography.Text
                        className={styles.TariffName}
                    >{`${tariff.name} tariff`}</Typography.Text>
                    <Button onClick={() => onDetailsClick?.(tariff)} type='link'>
                        Подробнее
                    </Button>
                </Row>
            </Card.Header>
            <Card.Body
                className={styles.CardBody}
                style={{
                    backgroundImage: `url(${isActive || isFreeTariff ? '' : 'disabled-'}${
                        tariff.cover
                    })`,
                }}
            />
            <Card.Footer className={styles.CardFooter}>{footer}</Card.Footer>
        </Card>
    );
};
