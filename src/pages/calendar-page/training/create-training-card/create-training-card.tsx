import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { TrainingType } from '@redux/catalogs';
import {
    CreateExerciseDTO,
    Exercise,
    useCreateTrainingMutation,
    useEditTrainingMutation,
} from '@redux/training';
import { Button, Select } from 'antd';
import invariant from 'invariant';
import { EmptyPlaceholder } from '../empty-placeholder';
import { useTraining, useTrainingActions } from '../training-provider';
import { CreateFlow, EditFlow, ReadFlow } from '../training-provider/reducer';
import styles from './create-training-card.module.less';

const NoExercise = () => (
    <Card.Body style={{ paddingBlock: 14 }}>
        <EmptyPlaceholder />
    </Card.Body>
);

type ExerciseListProps = {
    exercises: (Exercise | CreateExerciseDTO)[];
    onEditExercise?(exercise: Exercise | CreateExerciseDTO): void;
    flow: (CreateFlow | EditFlow | ReadFlow)['flow'];
};

const ExerciseList = ({ flow, exercises, onEditExercise }: ExerciseListProps) => (
    <Card.Body style={{ paddingTop: 16, paddingInline: 0 }}>
        <ul className={styles.ExerciseList}>
            {exercises.map((exercise, idx) => (
                <li key={idx} className={styles.ExerciseListItem}>
                    <span style={{ color: 'var(--character-light-secondary-45)' }}>
                        {exercise.name}
                    </span>
                    <Button
                        type='link'
                        style={{
                            height: 22,
                            color:
                                flow === 'read' ? 'var(--character-light-secondary-45)' : undefined,
                        }}
                        onClick={() => onEditExercise?.(exercise)}
                        icon={<EditOutlined style={{ width: 18, height: 18 }} />}
                    />
                </li>
            ))}
        </ul>
    </Card.Body>
);

export type CreateEditTrainingCardProps = {
    exercises: (Exercise | CreateExerciseDTO)[];
    selectedTrainingType: TrainingType | null;
    availableTrainingTypes: TrainingType[];
    onCancel?(): void;
    onTrainingEdited?(): void;
    onTrainingCreated?(): void;
    onAddExercise?(trainingType: TrainingType): void;
    onEditExercise?(trainingType: TrainingType, exercise: Exercise | CreateExerciseDTO): void;
} & (CreateFlow | EditFlow | ReadFlow);

export const CreateEditTrainingCard = ({
    flow,
    training,
    onCancel,
    exercises,
    onAddExercise,
    onEditExercise,
    onTrainingEdited,
    onTrainingCreated,
    selectedTrainingType,
    availableTrainingTypes,
}: CreateEditTrainingCardProps) => {
    const [createTraining, { isLoading: isCreateTrainingLoading }] = useCreateTrainingMutation();
    const [editTraining, { isLoading: isEditTrainingLoading }] = useEditTrainingMutation();
    const { selectTrainingType } = useTrainingActions();
    const { date, isPast } = useTraining();

    const handleEditExercise = (exercise: Exercise | CreateExerciseDTO) => {
        if (selectedTrainingType) {
            onEditExercise?.(selectedTrainingType, exercise);
        }
    };

    const handleCreateTraining = async () => {
        invariant(selectedTrainingType, 'Training type is not selected');

        try {
            await createTraining({
                exercises,
                name: selectedTrainingType.name,
                date: date.toISOString(),
            }).unwrap();
        } catch {
            return;
        }

        onTrainingCreated?.();
    };

    const handleEditTraining = async () => {
        invariant(selectedTrainingType, 'Training type is not selected');
        invariant(training, 'Training is undefined');

        try {
            await editTraining({
                id: training._id,
                training: {
                    ...training,
                    exercises,
                    isImplementation: isPast,
                    name: selectedTrainingType.name,
                },
            });
        } catch {
            return;
        }

        onTrainingEdited?.();
    };

    const handleSave = () => {
        if (flow === 'create') {
            handleCreateTraining();
        } else if (flow === 'edit') {
            handleEditTraining();
        }
    };

    return (
        <Card className={styles.TrainingCard}>
            <Card.Header className={styles.CreateTrainingCardHeader}>
                <Button
                    onClick={onCancel}
                    icon={<ArrowLeftOutlined />}
                    className={styles.CancelButton}
                />
                <Select
                    size='small'
                    labelInValue
                    value={selectedTrainingType}
                    options={availableTrainingTypes}
                    placeholder='Выбор типа тренировки'
                    className={styles.TrainingTypeSelect}
                    fieldNames={{ label: 'name', value: 'key' }}
                    onSelect={(_, option) => selectTrainingType(option)}
                />
            </Card.Header>
            {exercises.length ? (
                <ExerciseList
                    flow={flow}
                    exercises={exercises}
                    onEditExercise={handleEditExercise}
                />
            ) : (
                <NoExercise />
            )}
            <Card.Footer>
                <Button
                    block
                    style={{ marginBottom: 8 }}
                    disabled={!selectedTrainingType || flow === 'read'}
                    onClick={() => selectedTrainingType && onAddExercise?.(selectedTrainingType)}
                >
                    Добавить упражнения
                </Button>
                <Button
                    block
                    type='link'
                    onClick={handleSave}
                    disabled={!exercises.length || flow === 'read'}
                    loading={isCreateTrainingLoading || isEditTrainingLoading}
                >
                    Сохранить
                </Button>
            </Card.Footer>
        </Card>
    );
};
