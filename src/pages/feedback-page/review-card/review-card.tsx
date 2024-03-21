import { UserOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { Review } from '@redux/reviews';
import { Avatar, Typography } from 'antd';

import { Rate } from '../rate';

import styles from './review-card.module.less';

type ReviewCardProps = {
    review: Review;
};

const formatISODate = (dateString: string) => {
    const date = new Date(dateString);
    const pad = (num: number) => num.toString().padStart(2, '0');

    return [pad(date.getUTCDate()), pad(date.getUTCMonth()), date.getUTCFullYear()].join('.');
};

const DEFAULT_NAME = 'Пользователь';

export const ReviewCard = ({ review }: ReviewCardProps) => (
    <Card className={styles.ReviewCard}>
        <div className={styles.Reviewer}>
            <Avatar icon={<UserOutlined />} size={42} src={review.imageSrc} />
            <Typography.Text>{review.fullName ?? DEFAULT_NAME}</Typography.Text>
        </div>
        <div className={styles.Content}>
            <div className={styles.RateWrap}>
                <Rate disabled={true} value={review.rating} />
                <Typography.Text style={{ fontSize: 12 }} type='secondary'>
                    {formatISODate(review.createdAt)}
                </Typography.Text>
            </div>
            <Typography.Paragraph style={{ margin: 0 }} type='secondary'>
                {review.message}
            </Typography.Paragraph>
        </div>
    </Card>
);
