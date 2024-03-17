import { EditOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useXss } from '@hooks/use-breakpoint';
import { TrainingType } from '@redux/catalogs';
import { CreateExerciseDTO, Exercise } from '@redux/training';
import { Button, Drawer, DrawerProps, FormInstance, Row, Typography } from 'antd';
import cn from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { useTraining } from '../training-provider';
import { defaultExercise } from '../training-provider/reducer';
import { TrainingTypeLabel } from '../training-type-lable';
import styles from './exercise-drawer.module.less';
import { ExerciseForm } from './exercise-form';

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
    const formInstances = useRef<FormInstance<CreateExerciseDTO>[]>([]);
    const { date } = useTraining();
    const xss = useXss();

    console.log(formInstances.current);

    useEffect(() => {
        setExercises(initialExercises);
    }, [initialExercises]);

    const handleClose = () => {
        onClose?.(mode === 'read' ? [] : getValidExercises(formInstances.current));
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
                        readOnly={mode === 'read'}
                        initialValues={exercise}
                        ref={(cur) =>
                            cur?.form
                                ? (formInstances.current[idx] = cur.form)
                                : formInstances.current.splice(idx, 1)
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
                        onClick={() => setExercises((prev) => [...prev, { ...defaultExercise }])}
                    >
                        Добавить ещё
                    </Button>
                    {mode === 'edit' && (
                        <Button
                            block
                            size='large'
                            icon={<MinusOutlined />}
                            className={styles.Button}
                            disabled={exercises.length < 2}
                            onClick={() => setExercises((prev) => prev.slice(0, -1))}
                        >
                            Удалить
                        </Button>
                    )}
                </Row>
            )}
        </Drawer>
    );
};
