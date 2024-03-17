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
import { CreateFlow, EditFlow } from '../training-provider/reducer';
import styles from './create-training-card.module.less';

const NoExercise = () => (
    <Card.Body style={{ paddingBlock: 14 }}>
        <EmptyPlaceholder />
    </Card.Body>
);

type ExerciseListProps = {
    exercises: (Exercise | CreateExerciseDTO)[];
    onEditExercise?(exercise: Exercise | CreateExerciseDTO): void;
};

const ExerciseList = ({ exercises, onEditExercise }: ExerciseListProps) => (
    <Card.Body style={{ paddingTop: 16, paddingInline: 0 }}>
        <ul className={styles.ExerciseList}>
            {exercises.map((exercise, idx) => (
                <li key={idx} className={styles.ExerciseListItem}>
                    {exercise.name}
                    <Button
                        type='link'
                        style={{ height: 22 }}
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
    onEditSaved?(): void;
    onTrainingCreated?(): void;
    onAddExercise?(trainingType: TrainingType): void;
    onEditExercise?(trainingType: TrainingType, exercise: Exercise | CreateExerciseDTO): void;
} & (CreateFlow | EditFlow);

export const CreateEditTrainingCard = ({
    flow,
    training,
    onCancel,
    exercises,
    onEditSaved,
    onAddExercise,
    onEditExercise,
    onTrainingCreated,
    selectedTrainingType,
    availableTrainingTypes,
}: CreateEditTrainingCardProps) => {
    const [createTraining, { isLoading: isCreateTrainingLoading }] = useCreateTrainingMutation();
    const [editTraining, { isLoading: isEditTrainingLoading }] = useEditTrainingMutation();
    const { selectTrainingType } = useTrainingActions();
    const { date } = useTraining();

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
                    isImplementation: true,
                    name: selectedTrainingType.name,
                },
            });
        } catch {
            return;
        }

        onEditSaved?.();
    };

    const handleSave = () => {
        if (flow === 'create') {
            handleCreateTraining();
        } else {
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
                <ExerciseList exercises={exercises} onEditExercise={handleEditExercise} />
            ) : (
                <NoExercise />
            )}
            <Card.Footer>
                <Button
                    block
                    style={{ marginBottom: 8 }}
                    disabled={!selectedTrainingType}
                    onClick={() => selectedTrainingType && onAddExercise?.(selectedTrainingType)}
                >
                    Добавить упражнения
                </Button>
                <Button
                    block
                    type='link'
                    onClick={handleSave}
                    loading={isCreateTrainingLoading || isEditTrainingLoading}
                >
                    Сохранить
                </Button>
            </Card.Footer>
        </Card>
    );
};
