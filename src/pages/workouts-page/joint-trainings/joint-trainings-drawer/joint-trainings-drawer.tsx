import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { AppLoader } from '@components/app-loader';
import { Button } from '@components/button';
import { Drawer, DrawerProps } from '@components/drawer';
import { ExerciseFormsMenu, ExerciseFormsMenuHandle } from '@components/exercise-forms-menu';
import { Modal } from '@components/modal';
import { notification } from '@components/notification';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DatePickerCell } from '@pages/workouts-page/my-trainings/training-drawer/date-picker-cell';
import { trainingPeriods } from '@pages/workouts-page/my-trainings/training-periods';
import { selectTrainingTypeByName, TrainingType, UserJointTraining } from '@redux/catalogs';
import {
    createExerciseDraft,
    useCreateTrainingMutation,
    useLazyFetchTrainingListQuery,
} from '@redux/training';
import { Avatar, Checkbox, DatePicker, Form, Row, Select, Typography } from 'antd';
import invariant from 'invariant';
import moment, { Moment } from 'moment';

import styles from './joint-trainings-drawer.module.less';

type JointTrainingDrawerProps = Omit<DrawerProps, 'onClose'> & {
    partner?: UserJointTraining;
    onClose?(): void;
};

type FormValues = {
    date: Moment;
    parameters?: {
        repeat: boolean;
        period: number;
    };
};

export const JointTrainingDrawer = ({
    open,
    onClose,
    partner,
    ...props
}: JointTrainingDrawerProps) => {
    const [form] = Form.useForm<FormValues>();
    const selectedDate = Form.useWatch('date', form);
    const trainingType = useAppSelector(selectTrainingTypeByName(partner?.trainingType));

    const [isMenuTouched, setIsMenuTouched] = useState(false);
    const [isRepeat, setIsRepeat] = useState(false);

    const [createTraining, { isLoading: isCreateTrainingLoading }] = useCreateTrainingMutation();
    const [fetchTrainings] = useLazyFetchTrainingListQuery();

    const exerciseMenuRef = useRef<ExerciseFormsMenuHandle>(null);
    const [hasValidExercise, setHasValidExercise] = useState(false);

    const [drawerOpen, setDrawerOpen] = useState(open);

    if (open !== drawerOpen) setDrawerOpen(open);

    const [prevPartner, setPrevPartner] = useState(partner);

    if (prevPartner !== partner) {
        setIsMenuTouched(false);
        setPrevPartner(partner);
        setIsRepeat(false);
    }

    useEffect(() => {
        form.resetFields();
    }, [partner, form]);

    const saveDisabled = !isMenuTouched || !selectedDate || !hasValidExercise;

    const handleMenuTouched = useCallback(() => setIsMenuTouched(true), []);

    const handleClose = () => {
        setDrawerOpen(false);
        onClose?.();
    };

    const handleSave = async () => {
        if (!exerciseMenuRef.current) return;

        invariant(selectedDate, 'Date is not selected');
        invariant(trainingType, 'TrainingType is undefined');

        const period = form.getFieldValue(['parameters', 'period']);
        const exercises = exerciseMenuRef.current.getValidExercises();

        const dto = {
            name: trainingType.name,
            date: selectedDate.toISOString(),
            parameters: { period: isRepeat ? period : undefined, repeat: isRepeat },
            exercises: exercises.map(createExerciseDraft),
        };

        try {
            await createTraining(dto).unwrap();
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
                message: 'Новая тренировка успешно добавлена',
            },
        });

        handleClose();
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
                onClose={handleClose}
                open={drawerOpen}
                title='Совместная тренировка'
                titleIcon={<PlusOutlined />}
                {...props}
            >
                <Row>
                    <Row className={styles.AvatarContainer}>
                        <Avatar
                            icon={
                                <UserOutlined
                                    style={{ color: 'var(--character-light-title-85)' }}
                                />
                            }
                            size='large'
                            src={partner?.imageSrc}
                            style={{ width: 42, height: 42, background: 'var(--theme-gray-3)' }}
                        />
                        <Typography.Paragraph className={styles.UserName}>
                            {partner?.name}
                        </Typography.Paragraph>
                        <TrainingTypeBadge trainingType={trainingType as TrainingType} />
                    </Row>
                </Row>
                <Form className={styles.Form} form={form} onValuesChange={handleMenuTouched}>
                    <Row
                        align='middle'
                        justify='space-between'
                        style={{ marginBottom: isRepeat ? 'var(--space-2)' : 'var(--space-5)' }}
                    >
                        <Form.Item<FormValues> name='date' noStyle={true}>
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
                            initialValue={isRepeat}
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
                    initialExercises={[createExerciseDraft()]}
                    mode='create'
                    onMenuTouched={handleMenuTouched}
                    onValidChange={setHasValidExercise}
                />
            </Drawer>
        </Fragment>
    );
};
