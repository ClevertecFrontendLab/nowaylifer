import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { CloseOutlined, EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useXss } from '@hooks/use-breakpoint';
import { TrainingType } from '@redux/catalogs';
import { createExerciseDraft, Exercise } from '@redux/training';
import { Button, Drawer, DrawerProps, FormInstance, Row, Typography } from 'antd';
import cn from 'classnames';

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
        <Fragment>
            <PlusOutlined style={titleIconStyle} /> Добавление упражнений
        </Fragment>
    ),
    edit: (
        <Fragment>
            <EditOutlined style={titleIconStyle} />
            Редактирование
        </Fragment>
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

    const handleClose = () =>
        onClose?.(mode === 'read' ? [] : getValidExercises(exerciseFormMap.current));

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
            className={styles.Drawer}
            closeIcon={<CloseOutlined data-test-id='modal-drawer-right-button-close' />}
            data-test-id='modal-drawer-right'
            destroyOnClose={true}
            height={xss ? '90%' : undefined}
            mask={false}
            onClose={handleClose}
            placement={xss ? 'bottom' : 'right'}
            title={
                <Typography.Text className={styles.DrawerTitle}>
                    {titleByModeMap[mode]}
                </Typography.Text>
            }
            width={xss ? '100%' : 408}
            {...props}
        >
            <div className={styles.Extra}>
                <TrainingTypeBadge trainingType={trainingType} />
                <time dateTime={date.local().format()}>{date.local().format('DD.MM.YYYY')}</time>
            </div>
            <div className={styles.FormsWrap}>
                {exercises.map((exercise, idx) => (
                    <ExerciseForm
                        key={exercise._id}
                        ref={(form) => {
                            if (form) {
                                exerciseFormMap.current[exercise._id] = form;
                            } else {
                                delete exerciseFormMap.current[exercise._id];
                            }
                        }}
                        index={idx}
                        initialValues={exercise}
                        mode={mode}
                        onSelectChange={(selected) => handleSelectFormChange(idx, selected)}
                        readOnly={mode === 'read'}
                    />
                ))}
            </div>
            {mode !== 'read' && (
                <Row>
                    <Button
                        block={true}
                        className={cn(styles.Button, styles.AddButton)}
                        icon={<PlusOutlined />}
                        onClick={() => setExercises((prev) => [...prev, createExerciseDraft()])}
                        size='large'
                    >
                        Добавить ещё
                    </Button>
                    {mode === 'edit' && (
                        <Button
                            block={true}
                            className={styles.Button}
                            disabled={!selectedFormIndexes.length}
                            icon={<MinusOutlined />}
                            onClick={handleDelete}
                            size='large'
                        >
                            Удалить
                        </Button>
                    )}
                </Row>
            )}
        </Drawer>
    );
};
