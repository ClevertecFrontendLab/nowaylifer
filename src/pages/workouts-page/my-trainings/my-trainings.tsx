import { Fragment, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingTypes } from '@redux/catalogs';
import { selectTrainingList } from '@redux/training';
import { Typography } from 'antd';

import styles from './my-trainings.module.less';
import { TrainingDrawer } from './training-drawer';
import { TrainingTable } from './training-table';

const NoTrainingsScreen = ({ onCreateTraining }: { onCreateTraining: () => void }) => (
    <div className={styles.NoTrainingsScreenContainer}>
        <Typography.Paragraph className={styles.NoTrainingsPara}>
            У вас ещё нет созданных тренировок
        </Typography.Paragraph>
        <Button onClick={onCreateTraining} size='large' type='primary'>
            Создать тренировку
        </Button>
    </div>
);

const getRandomKey = () => Math.random().toString();

export const MyTrainings = () => {
    const drawerKeyRef = useRef(getRandomKey());
    const [drawerOpen, setDrawerOpen] = useState(false);
    const trainingTypes = useAppSelector(selectTrainingTypes);
    const trainings = useAppSelector(selectTrainingList);
    const hasTrainings = !!trainings.length;

    return (
        <Fragment>
            <TrainingDrawer
                key={drawerKeyRef.current}
                afterOpenChange={(open) => {
                    if (!open) drawerKeyRef.current = getRandomKey();
                }}
                mode='create'
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                trainingTypes={trainingTypes}
            />
            {hasTrainings ? (
                <Fragment>
                    <TrainingTable trainings={trainings} />
                    <Button
                        className={styles.NewTrainingBtn}
                        icon={<PlusOutlined />}
                        onClick={() => setDrawerOpen(true)}
                        size='large'
                        type='primary'
                    >
                        Новая тренировка
                    </Button>
                </Fragment>
            ) : (
                <NoTrainingsScreen onCreateTraining={() => setDrawerOpen(true)} />
            )}
        </Fragment>
    );
};
