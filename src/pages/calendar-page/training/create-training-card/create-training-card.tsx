import { ArrowLeftOutlined } from '@ant-design/icons';
import { Card } from '@components/card';
import { TrainingType } from '@redux/catalogs';
import { Button, Select } from 'antd';
import { EmptyPlaceholder } from '../empty-placeholder';
import styles from './create-training-card.module.less';
import { useState } from 'react';

export type CreateTrainingCardProps = {
    trainingTypes: TrainingType[];
    onCancel?(): void;
    onAddExercise?(trainingType: TrainingType): void;
};

export const CreateTrainingCard = ({
    trainingTypes,
    onCancel,
    onAddExercise,
}: CreateTrainingCardProps) => {
    const [selectedTrainingType, setSelectedTrainingType] = useState<TrainingType | null>(null);
    console.log(trainingTypes);

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
                    options={trainingTypes}
                    placeholder='Выбор типа тренировки'
                    className={styles.TrainingTypeSelect}
                    fieldNames={{ label: 'name', value: 'key' }}
                    onSelect={(_, option) => setSelectedTrainingType(option)}
                />
            </Card.Header>
            <Card.Body style={{ paddingBlock: 14 }}>
                <EmptyPlaceholder />
            </Card.Body>
            <Card.Footer>
                <Button
                    block
                    style={{ marginBottom: 8 }}
                    disabled={!selectedTrainingType}
                    onClick={() => selectedTrainingType && onAddExercise?.(selectedTrainingType)}
                >
                    Добавить упражнения
                </Button>
                <Button type='link' block>
                    Сохранить
                </Button>
            </Card.Footer>
        </Card>
    );
};
