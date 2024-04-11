import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { AppLoader } from '@components/app-loader';
import { Button } from '@components/button';
import { Drawer, DrawerProps } from '@components/drawer';
import { ExerciseFormsMenu, ExerciseFormsMenuHandle } from '@components/exercise-forms-menu';
import { Modal } from '@components/modal';
import { TrainingTypeBadge } from '@components/training-type-badge';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { DatePickerCell } from '@pages/workouts-page/my-trainings/training-drawer/date-picker-cell';
import { trainingPeriods } from '@pages/workouts-page/my-trainings/training-periods';
import { selectTrainingTypeByName, TrainingPal, TrainingType } from '@redux/catalogs';
import { useSendInviteMutation } from '@redux/joint-training';
import { createExerciseDraft, useCreateTrainingMutation } from '@redux/training';
import { Avatar, Checkbox, DatePicker, Form, Row, Select, Typography } from 'antd';
import invariant from 'invariant';
import moment, { Moment } from 'moment';

import styles from './joint-training-drawer.module.less';

type JointTrainingDrawerProps = Omit<DrawerProps, 'onClose'> & {
    partner?: TrainingPal;
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
    const [sendInvite, { isLoading: isSendInviteLoading }] = useSendInviteMutation();

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

    const handleInvite = async () => {
        if (!exerciseMenuRef.current) return;

        invariant(selectedDate, 'Date is not selected');
        invariant(trainingType, 'TrainingType is undefined');
        invariant(partner, 'Partner is undefined');

        const period = form.getFieldValue(['parameters', 'period']);
        const exercises = exerciseMenuRef.current.getValidExercises();

        const dto = {
            name: trainingType.name,
            date: selectedDate.toISOString(),
            parameters: { period: isRepeat ? period : undefined, repeat: isRepeat },
            exercises: exercises.map(createExerciseDraft),
        };

        try {
            const training = await createTraining(dto).unwrap();

            await sendInvite({ trainingId: training._id, to: partner?.id }).unwrap();
        } catch {
            Modal.error({
                title: <Typography.Text>При сохранении данных произошла ошибка</Typography.Text>,
                content: <Typography.Paragraph>Придётся попробовать ещё раз</Typography.Paragraph>,
            });

            return;
        }

        handleClose();
    };

    return (
        <Fragment>
            <AppLoader open={isCreateTrainingLoading || isSendInviteLoading} />
            <Drawer
                data-test-id='modal-drawer-right'
                footer={
                    <Button
                        block={true}
                        disabled={saveDisabled}
                        htmlType='submit'
                        onClick={handleInvite}
                        size='large'
                        type='primary'
                    >
                        Отправить приглашение
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
                    </Row>
                    <TrainingTypeBadge
                        style={{ marginLeft: 'auto' }}
                        trainingType={trainingType as TrainingType}
                    />
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
                                data-test-id='modal-drawer-right-date-picker'
                                dateRender={(date) => <DatePickerCell date={date} />}
                                disabledDate={(date) => date.isBefore(moment())}
                                format='DD.MM.YYYY'
                            />
                        </Form.Item>
                        <Checkbox
                            checked={isRepeat}
                            data-test-id='modal-drawer-right-checkbox-period'
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
                                data-test-id='modal-drawer-right-select-period'
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
                    mode='create'
                    onMenuTouched={handleMenuTouched}
                    onValidChange={setHasValidExercise}
                />
            </Drawer>
        </Fragment>
    );
};
