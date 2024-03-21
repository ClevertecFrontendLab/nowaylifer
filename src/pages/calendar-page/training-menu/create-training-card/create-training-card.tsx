import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { TrainingType } from '@redux/catalogs';
import {
    Exercise,
    useCreateTrainingMutation,
    useEditTrainingMutation,
    useLazyFetchTrainingListQuery,
} from '@redux/training';
import { Button, Select } from 'antd';
import invariant from 'invariant';

import { EmptyPlaceholder } from '../empty-placeholder';
import { useTraining, useTrainingActions } from '../training-provider';
import { CreateFlow, EditFlow, ReadFlow } from '../training-provider/training-provider.reducer';

import styles from './create-training-card.module.less';

const NoExercise = () => (
    <Card.Body style={{ paddingBlock: 14 }}>
        <EmptyPlaceholder />
    </Card.Body>
);

type ExerciseListProps = {
    visible: boolean;
    exercises: Exercise[];
    onEditExercise?(exercise: Exercise): void;
    flow: (CreateFlow | EditFlow | ReadFlow)['flow'];
};

const ExerciseList = ({ visible, flow, exercises, onEditExercise }: ExerciseListProps) => (
    <Card.Body style={{ paddingTop: 16, paddingInline: 0 }}>
        <ul className={styles.ExerciseList}>
            {exercises.map((exercise, idx) => (
                <li key={exercise._id} className={styles.ExerciseListItem}>
                    <span style={{ color: 'var(--character-light-secondary-45)' }}>
                        {exercise.name}
                    </span>
                    <Button
                        data-test-id={
                            visible ? `modal-update-training-edit-button${idx}` : undefined
                        }
                        icon={<EditOutlined style={{ width: 18, height: 18 }} />}
                        onClick={() => onEditExercise?.(exercise)}
                        style={{
                            height: 22,
                            color:
                                flow === 'read' ? 'var(--character-light-secondary-45)' : undefined,
                        }}
                        type='link'
                    />
                </li>
            ))}
        </ul>
    </Card.Body>
);

export type CreateEditTrainingCardProps = {
    selectedTrainingType: TrainingType | null;
    availableTrainingTypes: TrainingType[];
    exercises: Exercise[];
    visible: boolean;
    onCancel?(): void;
    onTrainingEdited?(): void;
    onTrainingCreated?(): void;
    onSaveTrainingError?(error: unknown): void;
    onAddExercise?(trainingType: TrainingType): void;
    onEditExercise?(trainingType: TrainingType, exercise: Exercise): void;
} & (CreateFlow | EditFlow | ReadFlow);

export const CreateEditTrainingCard = ({
    flow,
    visible,
    training,
    onCancel,
    exercises,
    onAddExercise,
    onEditExercise,
    onTrainingEdited,
    onTrainingCreated,
    onSaveTrainingError,
    selectedTrainingType,
    availableTrainingTypes,
}: CreateEditTrainingCardProps) => {
    const [createTraining, { isLoading: isCreateTrainingLoading }] = useCreateTrainingMutation();
    const [editTraining, { isLoading: isEditTrainingLoading }] = useEditTrainingMutation();
    const [fetchTrainings] = useLazyFetchTrainingListQuery();
    const { selectTrainingType } = useTrainingActions();
    const { date, isPast } = useTraining();

    const handleEditExercise = (exercise: Exercise) => {
        if (selectedTrainingType) {
            onEditExercise?.(selectedTrainingType, exercise);
        }
    };

    const handleCreateTraining = () => {
        invariant(selectedTrainingType, 'Training type is not selected');

        return createTraining({
            exercises,
            name: selectedTrainingType.name,
            date: date.toISOString(),
        }).unwrap();
    };

    const handleEditTraining = () => {
        invariant(selectedTrainingType, 'Training type is not selected');
        invariant(training, 'Training is undefined');

        return editTraining({
            id: training._id,
            training: {
                ...training,
                exercises,
                isImplementation: isPast,
                name: selectedTrainingType.name,
            },
        }).unwrap();
    };

    const handleSave = async () => {
        invariant(flow !== 'read', 'Cannot save changes in "read" flow');
        const saveFunc = flow === 'create' ? handleCreateTraining : handleEditTraining;

        try {
            await saveFunc();
        } catch (error) {
            onSaveTrainingError?.(error);
        }

        if (flow === 'create') {
            onTrainingCreated?.();
        } else {
            await fetchTrainings().unwrap();
            onTrainingEdited?.();
        }
    };

    return (
        <Card className={styles.TrainingCard} data-test-id='modal-create-exercise'>
            <Card.Header className={styles.CreateTrainingCardHeader}>
                <Button
                    className={styles.CancelButton}
                    data-test-id='modal-exercise-training-button-close'
                    icon={<ArrowLeftOutlined />}
                    onClick={onCancel}
                />
                <Select
                    className={styles.TrainingTypeSelect}
                    data-test-id='modal-create-exercise-select'
                    fieldNames={{ label: 'name', value: 'key' }}
                    labelInValue={true}
                    onSelect={(_, option) => selectTrainingType(option)}
                    options={availableTrainingTypes}
                    placeholder='Выбор типа тренировки'
                    size='small'
                    value={selectedTrainingType}
                />
            </Card.Header>
            {exercises.length ? (
                <ExerciseList
                    exercises={exercises}
                    flow={flow}
                    onEditExercise={handleEditExercise}
                    visible={visible}
                />
            ) : (
                <NoExercise />
            )}
            <Card.Footer>
                <Button
                    block={true}
                    disabled={!selectedTrainingType || flow === 'read'}
                    onClick={() => selectedTrainingType && onAddExercise?.(selectedTrainingType)}
                    style={{ marginBottom: 8 }}
                >
                    Добавить упражнения
                </Button>
                <Button
                    block={true}
                    disabled={!exercises.length || flow === 'read'}
                    loading={isCreateTrainingLoading || isEditTrainingLoading}
                    onClick={handleSave}
                    type='link'
                >
                    {flow === 'edit' ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </Card.Footer>
        </Card>
    );
};
