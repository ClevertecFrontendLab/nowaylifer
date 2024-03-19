import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useXss } from '@hooks/use-breakpoint';
import { createDefaultExercise } from '@pages/calendar-page/utils';
import { TrainingType } from '@redux/catalogs';
import { Exercise } from '@redux/training';
import { Button, Drawer, DrawerProps, FormInstance, Row, Typography } from 'antd';
import cn from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTraining } from '../training-provider';
import { TrainingTypeBadge } from '../training-type-badge';
import styles from './exercise-drawer.module.less';
import { ExerciseForm } from './exercise-form';

type ExerciseFormRecord = Record<Exercise['_id'], FormInstance<Exercise>>;

const getValidExercises = (exerciseFormMap: ExerciseFormRecord) =>
    Object.values(exerciseFormMap)
        .map((form) => form.getFieldsValue())
        .filter((exercise) => !!exercise.name);

const titleIconStyle = { width: 14, marginRight: 6 };

const titleByModeMap: Record<ExerciseDrawerMode, ReactNode> = {
    create: (
        <>
            <PlusOutlined style={titleIconStyle} /> Добавление упражнений
        </>
    ),
    edit: (
        <>
            <EditOutlined style={titleIconStyle} />
            Редактирование
        </>
    ),
    read: 'Просмотр упражнений',
};

export type ExerciseDrawerMode = 'create' | 'edit' | 'read';

export type ExerciseDrawerProps = Omit<DrawerProps, 'onClose'> & {
    mode: ExerciseDrawerMode;
    trainingType: TrainingType;
    initialExercises?: Exercise[];
    onClose?(exercises: Exercise[]): void;
};

export const ExerciseDrawer = ({
    mode,
    initialExercises = [],
    trainingType,
    onClose,
    ...props
}: ExerciseDrawerProps) => {
    const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
    const [selectedFormIndexes, setSelectedFormIndexes] = useState<number[]>([]);
    const exerciseFormMap = useRef<ExerciseFormRecord>({});
    const { date } = useTraining();
    const xss = useXss();

    useEffect(() => {
        setExercises(initialExercises);
    }, [initialExercises]);

    const handleClose = () => {
        onClose?.(mode === 'read' ? [] : getValidExercises(exerciseFormMap.current));
    };

    const handleSelectFormChange = (index: number, selected: boolean) => {
        setSelectedFormIndexes((prev) =>
            selected ? [...prev, index] : prev.filter((idx) => idx !== index),
        );
    };

    const handleDelete = () => {
        setExercises((prev) => prev.filter((_, idx) => !selectedFormIndexes.includes(idx)));
        setSelectedFormIndexes([]);
    };

    return (
        <Drawer
            mask={false}
            destroyOnClose
            className={styles.Drawer}
            width={xss ? '100%' : 408}
            height={xss ? '90%' : undefined}
            placement={xss ? 'bottom' : 'right'}
            onClose={handleClose}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            title={
                <Typography.Text className={styles.DrawerTitle}>
                    {titleByModeMap[mode]}
                </Typography.Text>
            }
            data-test-id='modal-drawer-right'
            {...props}
        >
            <div className={styles.Extra}>
                <TrainingTypeBadge trainingType={trainingType} />
                <time dateTime={date.local().format()}>{date.local().format('DD.MM.YYYY')}</time>
            </div>
            <div className={styles.FormsWrap}>
                {exercises.map((exercise, idx) => (
                    <ExerciseForm
                        mode={mode}
                        index={idx}
                        key={exercise._id}
                        initialValues={exercise}
                        readOnly={mode === 'read'}
                        onSelectChange={(selected) => handleSelectFormChange(idx, selected)}
                        ref={(form) =>
                            form
                                ? (exerciseFormMap.current[exercise._id] = form)
                                : delete exerciseFormMap.current[exercise._id]
                        }
                    />
                ))}
            </div>
            {mode !== 'read' && (
                <Row>
                    <Button
                        block
                        size='large'
                        icon={<PlusOutlined />}
                        className={cn(styles.Button, styles.AddButton)}
                        onClick={() => setExercises((prev) => [...prev, createDefaultExercise()])}
                    >
                        Добавить ещё
                    </Button>
                    {mode === 'edit' && (
                        <Button
                            block
                            size='large'
                            onClick={handleDelete}
                            icon={<MinusOutlined />}
                            className={styles.Button}
                            disabled={!selectedFormIndexes.length}
                        >
                            Удалить
                        </Button>
                    )}
                </Row>
            )}
        </Drawer>
    );
};
