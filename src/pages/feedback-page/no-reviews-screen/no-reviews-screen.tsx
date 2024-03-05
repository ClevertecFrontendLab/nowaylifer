import { Card } from '@components/card';
import { Button, Typography } from 'antd';
import styles from './no-reviews-screen.module.less';

export const NoReviewsScreen = ({ onAddReview }: { onAddReview: () => void }) => (
    <div className={styles.Wrap}>
        <Card className={styles.NoReviewsCard}>
            <h3 className={styles.Heading}>Оставтье свой отзыв первым</h3>
            <Typography.Paragraph type='secondary' className={styles.Para}>
                Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь
                своим мнением и опытом с другими пользователями, и помогите им сделать правильный
                выбор.
            </Typography.Paragraph>
        </Card>
        <Button
            type='primary'
            size='large'
            className={styles.Button}
            onClick={onAddReview}
            data-test-id='write-review'
        >
            Написать отзыв
        </Button>
    </div>
);
