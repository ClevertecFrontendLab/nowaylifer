import { Carousel, CarouselRef } from '@components/carousel';
import { Modal } from '@components/modal';
import { useXss } from '@hooks/use-breakpoint';
import { Training } from '@redux/training';
import { ButtonProps, Typography } from 'antd';
import { useRef } from 'react';
import { CalendarCellPopover } from '../../calendar-cell-popover';
import { CreateEditTrainingCard } from '../create-training-card';
import { ExerciseDrawer } from '../exercise-drawer';
import { TrainingCard } from '../training-card';
import { useTrainingActions, useTrainingState } from '../training-provider';
import styles from './training-popover.module.less';

export const TrainingPopover = () => {
    const carouselRef = useRef<CarouselRef | null>(null);
    const state = useTrainingState();
    const xss = useXss();
    const {
        closeDrawer,
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
    };

    const switchToCreateEditCard = () => {
        carouselRef.current?.goTo(1);
        switchScreen('exercises');
    };

    const handleEditTraining = (training: Training) => {
        editTraining(training);
        switchToCreateEditCard();
    };

    const handleCreateTraining = () => {
        createTraining();
        switchToCreateEditCard();
    };

    const handleCancelCreateEditTraining = async () => {
        closeDrawer();
        switchToTrainingCard();
    };

    const handleSaveTrainingError = () => {
        popoverOpenChange(false);
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
            onDestroy={resetState}
            open={state.popoverOpen}
            overlayClassName={styles.TrainingPopover}
            overlayStyle={{ width: xss ? 312 : 264 }}
            onOpenChange={popoverOpenChange}
            content={
                <>
                    <ExerciseDrawer
                        {...state.exerciseDrawer}
                        onDestroy={resetDrawerState}
                        onClose={exercisesEditedOrCreated}
                    />
                    <Carousel
                        onTransitionEnd={(slide) => slide === 0 && resetCreateEditTrainingCard()}
                        className={styles.Carousel}
                        speed={200}
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
                            onClose={() => popoverOpenChange(false)}
                        />
                        <CreateEditTrainingCard
                            onAddExercise={addExercise}
                            onEditExercise={editExercise}
                            {...state.createEditTrainingCard}
                            onCancel={handleCancelCreateEditTraining}
                            visible={state.currentScreen === 'exercises'}
                            onSaveTrainingError={handleSaveTrainingError}
                            onTrainingEdited={switchToTrainingCard}
                            onTrainingCreated={switchToTrainingCard}
                        />
                    </Carousel>
                </>
            }
        />
    );
};
