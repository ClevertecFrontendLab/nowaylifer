import { Fragment, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { AppLoader } from '@components/app-loader';
import { Button } from '@components/button';
import { Drawer, DrawerProps } from '@components/drawer';
import { ExerciseFormsMenu, ExerciseFormsMenuHandle } from '@components/exercise-forms-menu';
import { Modal } from '@components/modal';
import { notification } from '@components/notification';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingTypeByName, TrainingType } from '@redux/catalogs';
import {
    createExerciseDraft,
    Training,
    useCreateTrainingMutation,
    useEditTrainingMutation,
    useLazyFetchTrainingListQuery,
} from '@redux/training';
import { Checkbox, DatePicker, Form, Row, Select, Typography } from 'antd';
import invariant from 'invariant';
import moment, { Moment } from 'moment';

import { trainingPeriods } from '../training-periods';

import { DatePickerCell } from './date-picker-cell';
import styles from './training-drawer.module.less';

type TrainingDrawerMode = 'create' | 'edit';

const titleByMode: Record<TrainingDrawerMode, { title: ReactNode; titleIcon: ReactNode }> = {
    create: { title: 'Новая тренировка', titleIcon: <PlusOutlined /> },
    edit: { title: 'Редактировать тренировку', titleIcon: <EditOutlined /> },
};

type TrainingDrawerProps = Omit<DrawerProps, 'onClose'> & {
    mode: TrainingDrawerMode;
    trainingTypes: TrainingType[];
    initialTraining?: Training | null;
    onClose?(): void;
};

const defaultInitialExercises = [createExerciseDraft()];

type FormValues = {
    trainingType: TrainingType;
    date: Moment;
    parameters?: {
        repeat: boolean;
        period: number;
    };
};

export const TrainingDrawer = ({
    mode,
    trainingTypes,
    initialTraining,
    open,
    onClose,
    ...props
}: TrainingDrawerProps) => {
    const [form] = Form.useForm<FormValues>();
    const selectedDate = Form.useWatch('date', form);
    const initialTrainingType = useAppSelector(selectTrainingTypeByName(initialTraining?.name));
    const [selectedTrainingType, setSelectedTrainingType] = useState(initialTrainingType);

    const [isMenuTouched, setIsMenuTouched] = useState(false);
    const [isRepeat, setIsRepeat] = useState(initialTraining?.parameters?.repeat ?? false);

    const [createTraining, { isLoading: isCreateTrainingLoading }] = useCreateTrainingMutation();
    const [editTraining, { isLoading: isEditTrainingLoading }] = useEditTrainingMutation();
    const [fetchTrainings] = useLazyFetchTrainingListQuery();

    const exerciseMenuRef = useRef<ExerciseFormsMenuHandle>(null);
    const [hasValidExercise, setHasValidExercise] = useState(
        initialTraining?.exercises.some((e) => !!e.name) ?? false,
    );

    const [drawerOpen, setDrawerOpen] = useState(open);

    if (open !== drawerOpen) setDrawerOpen(open);

    const [prevTraining, setPrevTraining] = useState(initialTraining);

    if (prevTraining !== initialTraining) {
        setIsMenuTouched(false);
        setPrevTraining(initialTraining);
        setSelectedTrainingType(initialTrainingType);
        setIsRepeat(initialTraining?.parameters?.repeat ?? false);
    }

    useEffect(() => {
        if (initialTraining) {
            form.setFieldsValue({
                date: moment(initialTraining.date),
                trainingType: initialTrainingType,
                parameters: { period: initialTraining.parameters?.period },
            });
        } else {
            form.resetFields();
        }
    }, [initialTraining, form, initialTrainingType]);

    const saveDisabled =
        !isMenuTouched || !selectedDate || !hasValidExercise || !selectedTrainingType;

    const handleMenuTouched = useCallback(() => setIsMenuTouched(true), []);

    const handleClose = () => {
        setDrawerOpen(false);
        onClose?.();
    };

    const handleSave = async () => {
        if (!exerciseMenuRef.current) return;

        invariant(selectedTrainingType, 'Training type is not selected');
        invariant(selectedDate, 'Date is not selected');

        const period = form.getFieldValue(['parameters', 'period']);
        const exercises = exerciseMenuRef.current.getValidExercises();

        const dto = {
            name: selectedTrainingType.name,
            date: selectedDate.toISOString(),
            parameters: { period: isRepeat ? period : undefined, repeat: isRepeat },
            exercises: exercises.map(createExerciseDraft),
        };

        let runMutation: () => Promise<unknown>;

        if (mode === 'create') {
            runMutation = () => createTraining(dto).unwrap();
        } else {
            invariant(initialTraining, 'Training is undefined');

            runMutation = () =>
                editTraining({
                    id: initialTraining._id,
                    training: { ...dto, isImplementation: selectedDate.isBefore(moment()) },
                }).unwrap();
        }

        try {
            await runMutation();
        } catch {
            Modal.error({
                title: <Typography.Text>При сохранении данных произошла ошибка</Typography.Text>,
                content: <Typography.Paragraph>Придётся попробовать ещё раз</Typography.Paragraph>,
            });

            return;
        }

        try {
            await fetchTrainings().unwrap();
        } catch {
            return;
        }

        notification.alert({
            alertProps: {
                type: 'success',
                message:
                    mode === 'create'
                        ? 'Новая тренировка успешно добавлена'
                        : 'Тренировка успешно обновлена',
            },
        });

        handleClose();
    };

    return (
        <Fragment>
            <AppLoader open={isCreateTrainingLoading || isEditTrainingLoading} />
            <Drawer
                footer={
                    <Button
                        block={true}
                        disabled={saveDisabled}
                        htmlType='submit'
                        onClick={handleSave}
                        size='large'
                        type='primary'
                    >
                        Сохранить
                    </Button>
                }
                footerStyle={{ paddingInline: 'var(--space-6)' }}
                onClose={handleClose}
                open={drawerOpen}
                {...titleByMode[mode]}
                {...props}
            >
                <Form className={styles.Form} form={form} onValuesChange={handleMenuTouched}>
                    <Form.Item<FormValues> initialValue={initialTrainingType} name='trainingType'>
                        <Select
                            className={styles.Select}
                            fieldNames={{ label: 'name', value: 'key' }}
                            labelInValue={true}
                            onSelect={(_, option) => setSelectedTrainingType(option)}
                            options={trainingTypes}
                            placeholder='Выбор типа тренировки'
                        />
                    </Form.Item>
                    <Row
                        align='middle'
                        justify='space-between'
                        style={{ marginBottom: isRepeat ? 'var(--space-2)' : 'var(--space-5)' }}
                    >
                        <Form.Item<FormValues>
                            initialValue={
                                initialTraining ? moment(initialTraining.date) : undefined
                            }
                            name='date'
                            noStyle={true}
                        >
                            <DatePicker
                                className={styles.DatePicker}
                                dateRender={(date) => <DatePickerCell date={date} />}
                                disabledDate={(date) => date.isBefore(moment())}
                                format='DD.MM.YYYY'
                            />
                        </Form.Item>
                        <Checkbox
                            checked={isRepeat}
                            onChange={(e) => {
                                setIsRepeat(e.target.checked);
                                setIsMenuTouched(true);
                            }}
                        >
                            С периодичностью
                        </Checkbox>
                    </Row>
                    {isRepeat && (
                        <Form.Item<FormValues>
                            initialValue={initialTraining?.parameters?.period}
                            name={['parameters', 'period']}
                            style={{ marginBottom: 'var(--space-4)' }}
                        >
                            <Select
                                className={styles.Select}
                                options={trainingPeriods}
                                placeholder='Периодичность'
                                style={{ maxWidth: 156 }}
                            />
                        </Form.Item>
                    )}
                </Form>
                <ExerciseFormsMenu
                    ref={exerciseMenuRef}
                    addText='Добавить ещё упражнение'
                    initialExercises={initialTraining?.exercises ?? defaultInitialExercises}
                    mode={mode}
                    onMenuTouched={handleMenuTouched}
                    onValidChange={setHasValidExercise}
                />
            </Drawer>
        </Fragment>
    );
};
