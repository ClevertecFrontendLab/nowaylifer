import { HeartFilled, CalendarTwoTone, IdcardOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Card } from '@components/card';
import styles from './action-card-list.module.less';

const actions = [
    { title: 'Расписать тренировки', buttonText: 'Тренировки', buttonIcon: <HeartFilled /> },
    {
        title: 'Назначить календарь',
        buttonText: 'Календарь',
        buttonIcon: <CalendarTwoTone twoToneColor={['currentColor', 'currentColor']} />,
    },
    { title: 'Заполнить профиль', buttonText: 'Профиль', buttonIcon: <IdcardOutlined /> },
];

export const ActionCardList = () => (
    <ul className={styles.List}>
        {actions.map(({ title, buttonIcon, buttonText }, idx) => (
            <li key={idx} className={styles.Item}>
                <Card className={styles.CardItem} title={title}>
                    <Button className={styles.CardButton} icon={buttonIcon} block>
                        {buttonText}
                    </Button>
                </Card>
            </li>
        ))}
    </ul>
);
