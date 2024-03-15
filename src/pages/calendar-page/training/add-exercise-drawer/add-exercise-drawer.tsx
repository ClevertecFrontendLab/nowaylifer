import { PlusOutlined } from '@ant-design/icons';
import { TrainingType } from '@redux/catalogs';
import { CreateExerciseDTO } from '@redux/training';
import { Button, Drawer, DrawerProps, FormInstance, Typography } from 'antd';
import { Moment } from 'moment';
import { useMemo, useState } from 'react';
import { TrainingTypeLabel } from '../training-type-lable';
import styles from './add-exercise-drawer.module.less';
import { ExerciseForm } from './exercise-form';
import { useXss } from '@hooks/use-breakpoint';

type AddExercisesDrawerProps = Omit<DrawerProps, 'onClose'> & {
    trainingType: TrainingType;
    date: Moment;
    onClose?(exercises: CreateExerciseDTO[]): void;
};

const defaultExercise: CreateExerciseDTO = { name: '', replays: 1, weight: 0, approaches: 3 };

const getValidExercises = (formInstances: FormInstance<CreateExerciseDTO>[]) =>
    formInstances.map((form) => form.getFieldsValue()).filter((exercise) => !!exercise.name);

export const AddExercisesDrawer = ({
    trainingType,
    onClose,
    date,
    ...props
}: AddExercisesDrawerProps) => {
    const [exercises, setExercises] = useState<CreateExerciseDTO[]>([defaultExercise]);
    const formInstances: FormInstance<CreateExerciseDTO>[] = useMemo(() => [], []);
    const xss = useXss();

    return (
        <Drawer
            mask={false}
            className={styles.Drawer}
            width={xss ? '100%' : 408}
            height={xss ? '90%' : undefined}
            placement={xss ? 'bottom' : 'right'}
            onClose={() => onClose?.(getValidExercises(formInstances))}
            title={
                <Typography.Text className={styles.DrawerTitle}>
                    <PlusOutlined style={{ width: 14, marginRight: 6 }} />
                    Добавление упражнений
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
                        key={idx}
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
