import { Fragment, ReactNode, useCallback, useRef, useState } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { AppLoader } from '@components/app-loader';
import { Button } from '@components/button';
import { Drawer, DrawerProps } from '@components/drawer';
import { ExerciseFormsMenu, ExerciseFormsMenuHandle } from '@components/exercise-forms-menu';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { selectTrainingTypeMap, TrainingType } from '@redux/catalogs';
import { createExerciseDraft, Training, useCreateTrainingMutation } from '@redux/training';
import { Checkbox, DatePicker, Form, Row, Select } from 'antd';
import invariant from 'invariant';
import moment, { Moment } from 'moment';

import { DatePickerCell } from './date-picker-cell';
import styles from './training-drawer.module.less';

type TrainingDrawerMode = 'create' | 'edit';

const titleByMode: Record<TrainingDrawerMode, { title: ReactNode; titleIcon: ReactNode }> = {
    create: { title: 'Новая тренировка', titleIcon: <PlusOutlined /> },
    edit: { title: 'Редактировать тренировку', titleIcon: <EditOutlined /> },
};

type TrainingDrawerProps = DrawerProps & {
    mode: TrainingDrawerMode;
    trainingTypes: TrainingType[];
    initialTraining?: Training;
};

const defaultInitialExercises = [createExerciseDraft()];

const periods = [
    { label: 'Через 1 день', value: 1 },
    { label: 'Через 2 дня', value: 2 },
    { label: 'Через 3 дня', value: 3 },
    { label: 'Через 4 дня', value: 4 },
    { label: 'Через 5 дней', value: 5 },
    { label: 'Через 6 дней', value: 6 },
    { label: '1 раз в неделю', value: 7 },
];

type FormValues = {
    name: string;
    date: string;
    parameters?: {
        repeat: boolean;
        period: number;
    };
};

export const TrainingDrawer = ({
    mode,
    trainingTypes,
    initialTraining,
    ...props
}: TrainingDrawerProps) => {
    const [form] = Form.useForm<FormValues>();
    const [isMenuTouched, setIsMenuTouched] = useState(false);
    const trainingTypeMap = useAppSelector(selectTrainingTypeMap);
    const exerciseMenuRef = useRef<ExerciseFormsMenuHandle>(null);
    const [isPeriod, setIsPeriod] = useState(Boolean(initialTraining?.parameters?.period) ?? false);
    const [createTraining, { isLoading: isCreateTrainingLoading }] = useCreateTrainingMutation();
    // const [editTraining, { isLoading: isEditTrainingLoading }] = useEditTrainingMutation();
    const [selectedTrainingType, setSelectedTrainingType] = useState<TrainingType | null>(
        initialTraining ? trainingTypeMap[initialTraining.name] : null,
    );
    const [hasValidExercise, setHasValidExercise] = useState(
        initialTraining?.exercises.some((e) => !!e.name) ?? false,
    );
    const [selectedDate, setSelectedDate] = useState<Moment | undefined>(() =>
        initialTraining ? moment(initialTraining.date) : undefined,
    );

    const saveDisabled =
        !isMenuTouched || !selectedDate || !hasValidExercise || !selectedTrainingType;

    const handleMenuTouched = useCallback(() => setIsMenuTouched(true), []);

    const handleSave = () => {
        if (!exerciseMenuRef.current) return;

        invariant(selectedTrainingType, 'Training type is not selected');
        invariant(selectedDate, 'Date is not selected');

        const period = form.getFieldValue(['parameters', 'period']);
        const exercises = exerciseMenuRef.current?.getValidExercises();

        if (mode === 'create') {
            createTraining({
                name: selectedTrainingType.name,
                date: selectedDate.toISOString(),
                parameters: { period, repeat: !!period },
                exercises: exercises.map(createExerciseDraft),
            });
        }
    };

    return (
        <Fragment>
            <AppLoader open={isCreateTrainingLoading} />
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
                {...titleByMode[mode]}
                {...props}
            >
                <Form className={styles.Form} form={form} onValuesChange={handleMenuTouched}>
                    <Form.Item<FormValues> name='name'>
                        <Select
                            className={styles.Select}
                            fieldNames={{ label: 'name', value: 'key' }}
                            labelInValue={true}
                            onSelect={(_, option) => setSelectedTrainingType(option)}
                            options={trainingTypes}
                            placeholder='Выбор типа тренировки'
                            value={selectedTrainingType}
                        />
                    </Form.Item>
                    <Row
                        align='middle'
                        justify='space-between'
                        style={{ marginBottom: isPeriod ? 'var(--space-2)' : 'var(--space-5)' }}
                    >
                        <Form.Item<FormValues> name='date' noStyle={true}>
                            <DatePicker
                                className={styles.DatePicker}
                                dateRender={(date) => <DatePickerCell date={date} />}
                                disabledDate={(date) => date.isBefore(moment())}
                                format='DD.MM.YYYY'
                                onSelect={setSelectedDate}
                                placeholder='Выбрать дату'
                                value={selectedDate}
                            />
                        </Form.Item>
                        <Checkbox onChange={(e) => setIsPeriod(e.target.checked)}>
                            С периодичностью
                        </Checkbox>
                    </Row>
                    {isPeriod && (
                        <Form.Item<FormValues>
                            initialValue={initialTraining?.parameters?.period}
                            name={['parameters', 'period']}
                            style={{ marginBottom: 'var(--space-4)' }}
                        >
                            <Select
                                className={styles.Select}
                                options={periods}
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