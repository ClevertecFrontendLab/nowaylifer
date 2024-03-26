import { useNavigate } from 'react-router-dom';
import { CalendarTwoTone, HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { LoadCalendarPage } from '@pages/calendar-page';
import { RoutePath } from '@router/paths';
import { Button, ButtonProps } from 'antd';

import styles from './action-card-list.module.less';

const CardButton = ({ navigateTo, ...props }: ButtonProps & { navigateTo?: string }) => {
    const navigate = useNavigate();

    return (
        <Button
            block={true}
            className={styles.CardButton}
            onClick={navigateTo ? () => navigate(navigateTo) : undefined}
            {...props}
        />
    );
};

const cards = [
    {
        title: 'Расписать тренировки',
        content: <CardButton icon={<HeartFilled />}>Тренировки</CardButton>,
    },
    {
        title: 'Назначить календарь',
        content: (
            <LoadCalendarPage
                render={(load) => (
                    <CardButton
                        data-test-id='menu-button-calendar'
                        icon={<CalendarTwoTone twoToneColor={['currentColor', 'currentColor']} />}
                        onClick={load}
                    >
                        Календарь
                    </CardButton>
                )}
            />
        ),
    },
    {
        title: 'Заполнить профиль',
        content: (
            <CardButton icon={<IdcardOutlined />} navigateTo={RoutePath.Profile}>
                Профиль
            </CardButton>
        ),
    },
];

export const ActionCardList = () => (
    <ul className={styles.List}>
        {cards.map(({ title, content }) => (
            <li key={title} className={styles.Item}>
                <Card className={styles.CardItem} title={title}>
                    {content}
                </Card>
            </li>
        ))}
    </ul>
);
