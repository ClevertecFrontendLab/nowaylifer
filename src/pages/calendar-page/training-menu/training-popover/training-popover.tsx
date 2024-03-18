import { Modal } from '@components/modal';
import { useXss } from '@hooks/use-breakpoint';
import { Exercise, Training } from '@redux/training';
import { waitFor } from '@utils/waitFor';
import { ButtonProps, Carousel, Typography } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useRef } from 'react';
import { CalendarCellPopover } from '../../calendar-cell-popover';
import { CreateEditTrainingCard } from '../create-training-card';
import { ExerciseDrawer } from '../exercise-drawer';
import { TrainingCard } from '../training-card';
import { useTrainingActions, useTrainingState } from '../training-provider';
import styles from './training-popover.module.less';

const CAROUSEL_SPEED = 200;
const POPOVER_ANIMATION_DURATION = 200;
const DRAWER_ANIMATION_DURATION = 300;

const waitForCarouselAnimationEnd = () => waitFor(CAROUSEL_SPEED + 5);
const waitForPopoverAnimationEnd = () => waitFor(POPOVER_ANIMATION_DURATION + 5);
const waitForDrawerAnimationEnd = () => waitFor(DRAWER_ANIMATION_DURATION + 5);

type TrainingPopoverProps = {
    onPopoverClose?(): void;
};

export const TrainingPopover = ({ onPopoverClose }: TrainingPopoverProps) => {
    const carouselRef = useRef<CarouselRef | null>(null);
    const state = useTrainingState();
    const xss = useXss();
    const {
        closeDrawer: closeDrawerAction,
        resetDrawerState,
        resetState,
        addExercise,
        editTraining,
        editExercise,
        switchScreen,
        createTraining,
        popoverOpenChange,
        exercisesEditedOrCreated,
        resetCreateEditTrainingCard,
    } = useTrainingActions();

    const switchToTrainingCard = () => {
        carouselRef.current?.goTo(0);
        switchScreen('trainings');
        return waitForCarouselAnimationEnd();
    };

    const switchToCreateEditCard = () => {
        carouselRef.current?.goTo(1);
        switchScreen('exercises');
        return waitForCarouselAnimationEnd();
    };

    const handleEditTraining = (training: Training) => {
        editTraining(training);
        switchToCreateEditCard();
    };

    const handleCreateTraining = () => {
        createTraining();
        switchToCreateEditCard();
    };

    const closeDrawer = async () => {
        closeDrawerAction();
        await waitForDrawerAnimationEnd();
        resetDrawerState();
    };

    const handleCancelCreateEditTraining = async () => {
        closeDrawer();
        await switchToTrainingCard();
        resetCreateEditTrainingCard();
    };

    const handleTrainingCreatedOrEdited = async () => {
        await switchToTrainingCard();
        resetCreateEditTrainingCard();
    };

    const closePopover = async () => {
        popoverOpenChange(false);
        onPopoverClose?.();
        await waitForPopoverAnimationEnd();
        resetState();
    };

    const handlePopoverOpenChange = (open: boolean) => {
        if (!open) return closePopover();
        popoverOpenChange(true);
    };

    const handleExerciseEditedOrCreated = async (exercises: Exercise[]) => {
        exercisesEditedOrCreated(exercises);
        closeDrawer();
    };

    const handleSaveTrainingError = () => {
        closePopover();
        const modal = Modal.error({
            title: (
                <Typography.Text data-test-id='modal-error-user-training-title'>
                    При сохранении данных произошла ошибка
                </Typography.Text>
            ),
            content: (
                <Typography.Paragraph data-test-id='modal-error-user-training-subtitle'>
                    Придётся попробовать ещё раз
                </Typography.Paragraph>
            ),
            okText: 'Закрыть',
            okButtonProps: { 'data-test-id': 'modal-error-user-training-button' } as ButtonProps,
            onOk: () => modal.destroy(),
        });
    };

    return (
        <CalendarCellPopover
            modal={xss}
            open={state.popoverOpen}
            overlayClassName={styles.TrainingPopover}
            overlayStyle={{ width: xss ? 312 : 264 }}
            onOpenChange={handlePopoverOpenChange}
            content={
                <>
                    <ExerciseDrawer
                        {...state.exerciseDrawer}
                        onClose={handleExerciseEditedOrCreated}
                    />
                    <Carousel
                        className={styles.Carousel}
                        speed={CAROUSEL_SPEED}
                        accessibility={false}
                        ref={carouselRef}
                        infinite={false}
                        easing='ease-in'
                        adaptiveHeight
                        swipe={false}
                        effect='fade'
                        dots={false}
                    >
                        <TrainingCard
                            visible={state.currentScreen === 'trainings'}
                            onEditTraining={handleEditTraining}
                            createDisabled={state.createDisabled}
                            onCreateTraining={handleCreateTraining}
                            onClose={closePopover}
                        />
                        <CreateEditTrainingCard
                            onAddExercise={addExercise}
                            onEditExercise={editExercise}
                            {...state.createEditTrainingCard}
                            onCancel={handleCancelCreateEditTraining}
                            visible={state.currentScreen === 'exercises'}
                            onSaveTrainingError={handleSaveTrainingError}
                            onTrainingEdited={handleTrainingCreatedOrEdited}
                            onTrainingCreated={handleTrainingCreatedOrEdited}
                        />
                    </Carousel>
                </>
            }
        />
    );
};
