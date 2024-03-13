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
};

export const CreateTrainingCard = ({ trainingTypes, onCancel }: CreateTrainingCardProps) => {
    const [selectedTrainingType, setSelectedTrainingType] = useState<TrainingType | null>(null);

    return (
        <Card className={styles.TrainingCard}>
            <Card.Header className={styles.CreateTrainingCardHeader}>
                <Button
                    className={styles.CancelButton}
                    icon={<ArrowLeftOutlined />}
                    onClick={onCancel}
                />
                <Select
                    onSelect={setSelectedTrainingType}
                    size='small'
                    fieldNames={{ label: 'name', value: 'key' }}
                    className={styles.TrainingTypeSelect}
                    placeholder='Выбор типа тренировки'
                    options={trainingTypes}
                />
            </Card.Header>
            <Card.Body style={{ paddingBlock: 14 }}>
                <EmptyPlaceholder />
            </Card.Body>
            <Card.Footer>
                <Button block style={{ marginBottom: 8 }} disabled={!selectedTrainingType}>
                    Добавить упражнения
                </Button>
                <Button type='link' block>
                    Сохранить
                </Button>
            </Card.Footer>
        </Card>
    );
};
