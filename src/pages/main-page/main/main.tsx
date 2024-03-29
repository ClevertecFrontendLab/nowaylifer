import { Card } from '@components/card';
import { PageContent } from '@components/page-content';
import { Color } from '@constants/color';

import { ActionCardList } from './action-card-list';
import styles from './main.module.less';

export const Main = () => (
    <PageContent>
        <div className={styles.Wrap}>
            <Card
                style={{
                    marginBottom: 'var(--space-5)',
                    color: Color.PrimaryLight9,
                    fontSize: 'var(--font-size-md)',
                }}
            >
                <Card.Body style={{ padding: 'var(--space-5)' }}>
                    <h3>С CleverFit ты сможешь:</h3>
                    <ul style={{ listStylePosition: 'inside', listStyleType: '"— "' }}>
                        <li>
                            планировать свои тренировки на календаре, выбирая тип и уровень
                            нагрузки;
                        </li>
                        <li>
                            отслеживать свои достижения в разделе статистики, сравнивая свои
                            результаты с нормами и рекордами;
                        </li>
                        <li>
                            создавать свой профиль, где ты можешь загружать свои фото, видео и
                            отзывы о тренировках;
                        </li>
                        <li>
                            выполнять расписанные тренировки для разных частей тела, следуя
                            подробным инструкциям и советам профессиональных тренеров.
                        </li>
                    </ul>
                </Card.Body>
            </Card>
            <Card style={{ marginBottom: 'var(--space-4)' }}>
                <Card.Body style={{ padding: 'var(--space-5)' }}>
                    <p style={{ fontWeight: 500, fontSize: 20 }}>
                        CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса.
                        Не откладывай на завтра — начни тренироваться уже сегодня!
                    </p>
                </Card.Body>
            </Card>
            <ActionCardList />
        </div>
    </PageContent>
);
