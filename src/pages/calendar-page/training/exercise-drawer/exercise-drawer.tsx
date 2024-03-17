import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useXss } from '@hooks/use-breakpoint';
import { TrainingType } from '@redux/catalogs';
import { CreateExerciseDTO, Exercise } from '@redux/training';
import { Button, Drawer, DrawerProps, FormInstance, Typography } from 'antd';
import { Moment } from 'moment';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { defaultExercise } from '../training-provider/reducer';
import { TrainingTypeLabel } from '../training-type-lable';
import styles from './exercise-drawer.module.less';
import { ExerciseForm } from './exercise-form';
import { useTraining } from '../training-provider';

const getValidExercises = (formInstances: FormInstance<CreateExerciseDTO>[]) =>
    formInstances.map((form) => form.getFieldsValue()).filter((exercise) => !!exercise.name);

const titleIconStyle = { width: 14, marginRight: 6 };

const titleByModeMap: Record<ExerciseDrawerMode, ReactNode> = {
    create: (
        <>
            <PlusOutlined style={titleIconStyle} /> Добавление упражений
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
    initialExercises?: (Exercise | CreateExerciseDTO)[];
    onClose?(exercises: (Exercise | CreateExerciseDTO)[]): void;
};

export const ExerciseDrawer = ({
    mode,
    initialExercises = [],
    trainingType,
    onClose,
    ...props
}: ExerciseDrawerProps) => {
    const [exercises, setExercises] = useState<(CreateExerciseDTO | Exercise)[]>(initialExercises);
    const formInstances: FormInstance<CreateExerciseDTO>[] = useMemo(() => [], []);
    const { date } = useTraining();
    const xss = useXss();

    useEffect(() => {
        setExercises(initialExercises);
    }, [initialExercises]);

    const handleClose = () => {
        const hasChange = formInstances.some((form) => form.isFieldsTouched());
        onClose?.(mode === 'read' || !hasChange ? [] : getValidExercises(formInstances));
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
            title={
                <Typography.Text className={styles.DrawerTitle}>
                    {titleByModeMap[mode]}
                </Typography.Text>
            }
            {...props}
        >
            <div className={styles.Extra}>
                <TrainingTypeLabel trainingType={trainingType} />
                <time dateTime={date.format()}>{date.format('DD.MM.YYYY')}</time>
            </div>
            <div className={styles.FormsWrap}>
                {exercises.map((exercise, idx) => (
                    <ExerciseForm
                        key={exercise.name + idx}
                        disabled={mode === 'read'}
                        initialValues={exercise}
                        ref={(cur) =>
                            cur?.form ? formInstances.push(cur.form) : formInstances.splice(idx, 1)
                        }
                    />
                ))}
            </div>
            <Button
                block
                size='large'
                icon={<PlusOutlined />}
                className={styles.AddButton}
                onClick={() => setExercises((prev) => [...prev, { ...defaultExercise }])}
            >
                Добавить ещё
            </Button>
        </Drawer>
    );
};
