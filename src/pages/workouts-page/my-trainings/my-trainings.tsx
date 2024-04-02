import { Fragment, useState } from 'react';
import { Button } from '@components/button';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingTypes } from '@redux/catalogs';
import { Typography } from 'antd';

import styles from './my-trainings.module.less';
import { TrainingDrawer } from './training-drawer';

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

export const MyTrainings = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const trainingTypes = useAppSelector(selectTrainingTypes);

    return (
        <Fragment>
            <TrainingDrawer
                mode='create'
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                trainingTypes={trainingTypes}
            />
            <NoTrainingsScreen onCreateTraining={() => setDrawerOpen(true)} />
        </Fragment>
    );
};
