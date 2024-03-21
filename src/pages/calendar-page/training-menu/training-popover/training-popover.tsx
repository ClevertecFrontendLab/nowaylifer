import { Fragment, useRef } from 'react';
import { Modal } from '@components/modal';
import { useXss } from '@hooks/use-breakpoint';
import { Training } from '@redux/training';
import { ButtonProps, Carousel, Typography } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';

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
        resetState,
        addExercise,
        editTraining,
        editExercise,
        switchScreen,
        createTraining,
        resetDrawerState,
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
            content={
                <Fragment>
                    <ExerciseDrawer
                        {...state.exerciseDrawer}
                        afterOpenChange={(open) => !open && resetDrawerState()}
                        onClose={exercisesEditedOrCreated}
                    />
                    <Carousel
                        ref={carouselRef}
                        accessibility={false}
                        adaptiveHeight={true}
                        afterChange={(slide) => slide === 0 && resetCreateEditTrainingCard()}
                        className={styles.Carousel}
                        dots={false}
                        easing='ease-in'
                        effect='fade'
                        infinite={false}
                        speed={200}
                        swipe={false}
                    >
                        <TrainingCard
                            createDisabled={state.createDisabled}
                            onClose={() => popoverOpenChange(false)}
                            onCreateTraining={handleCreateTraining}
                            onEditTraining={handleEditTraining}
                            visible={state.currentScreen === 'trainings'}
                        />
                        <CreateEditTrainingCard
                            onAddExercise={addExercise}
                            onEditExercise={editExercise}
                            {...state.createEditTrainingCard}
                            onCancel={handleCancelCreateEditTraining}
                            onSaveTrainingError={handleSaveTrainingError}
                            onTrainingCreated={switchToTrainingCard}
                            onTrainingEdited={switchToTrainingCard}
                            visible={state.currentScreen === 'exercises'}
                        />
                    </Carousel>
                </Fragment>
            }
            modal={xss}
            onDestroy={resetState}
            onOpenChange={popoverOpenChange}
            open={state.popoverOpen}
            overlayClassName={styles.TrainingPopover}
            overlayStyle={{ width: xss ? 312 : 264 }}
        />
    );
};
