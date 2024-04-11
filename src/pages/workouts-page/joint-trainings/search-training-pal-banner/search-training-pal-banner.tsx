import { Button } from '@components/button';
import { Card } from '@components/card';
import { Row, Typography } from 'antd';

import styles from './search-training-pal-banner.module.less';

type SearchTrainingPalBannerProps = {
    onRandomSelect?(): void;
    onSelect?(): void;
};

export const SearchTrainingPalBanner = ({
    onRandomSelect,
    onSelect,
}: SearchTrainingPalBannerProps) => (
    <Card className={styles.Card}>
        <Card.Header className={styles.CardHeader}>
            <Typography.Paragraph className={styles.Title}>
                Хочешь тренироваться с тем, кто разделяет твои цели и темп? <br /> Можешь найти
                друга для совместных тренировок среди других пользователей.
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.Subtitle}>
                Можешь воспользоваться случайным выборов или выбрать друга с похожим на твой уровень
                и вид тренировки, и мы найдем тебе идеального спортивного друга.
            </Typography.Paragraph>
        </Card.Header>
        <Card.Body className={styles.CardBody}>
            <Row className={styles.ButtonsContainer}>
                <Button block={true} onClick={onRandomSelect} type='link'>
                    Случайный выбор
                </Button>
                <Button block={true} onClick={onSelect} type='link'>
                    Выбор друга по моим видам тренировок
                </Button>
            </Row>
        </Card.Body>
    </Card>
);
