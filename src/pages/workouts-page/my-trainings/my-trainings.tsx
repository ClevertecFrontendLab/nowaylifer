import { Fragment, ReactNode, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from '@components/button';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingTypes, useFetchTrainingCatalogState } from '@redux/catalogs';
import { selectTrainingList, Training } from '@redux/training';
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

export const MyTrainings = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const trainings = useAppSelector(selectTrainingList);
    const [drawerKey, setDrawerKey] = useState(() => crypto.randomUUID());
    const trainingTypes = useAppSelector(selectTrainingTypes);
    const [trainingToEdit, setTrainingToEdit] = useState<Training | null>(null);
    const hasTrainings = !!trainings.length;
    const { isSuccess } = useFetchTrainingCatalogState();

    const handleTrainingEdit = (training: Training) => {
        setTrainingToEdit(training);
        setDrawerOpen(true);
    };

    let content: ReactNode = null;

    if (isSuccess) {
        content = hasTrainings ? (
            <Fragment>
                <TrainingTable
                    onAddExercise={handleTrainingEdit}
                    onEditTraining={handleTrainingEdit}
                    trainings={trainings}
                />
                <Button
                    className={styles.NewTrainingBtn}
                    data-test-id='create-new-training-button'
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
        );
    }

    return (
        <Fragment>
            <TrainingDrawer
                key={drawerKey}
                afterOpenChange={(open) => {
                    if (!open) {
                        setTrainingToEdit(null);
                        setDrawerKey(crypto.randomUUID());
                    }
                }}
                initialTraining={trainingToEdit}
                mode={trainingToEdit ? 'edit' : 'create'}
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                trainingTypes={trainingTypes}
            />
            {content}
        </Fragment>
    );
};
