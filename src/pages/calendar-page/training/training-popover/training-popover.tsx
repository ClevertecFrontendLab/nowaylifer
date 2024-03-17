import { Modal } from '@components/modal';
import { useXss } from '@hooks/use-breakpoint';
import { Training } from '@redux/training';
import { waitFor } from '@utils/waitFor';
import { Carousel, Typography } from 'antd';
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

const waitForCarouselAnimationEnd = () => waitFor(CAROUSEL_SPEED + 5);
const waitForPopoverAnimationEnd = () => waitFor(POPOVER_ANIMATION_DURATION + 5);

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
        createTraining,
        popoverOpenChange,
        exercisesEditedOrCreated,
        resetCreateEditTrainingCard,
    } = useTrainingActions();

    const handleEditTraining = (training: Training) => {
        editTraining(training);
        carouselRef.current?.next();
    };

    const handleCreateTraining = () => {
        createTraining();
        carouselRef.current?.next();
    };

    const handleCancelCreateEditTraining = async () => {
        carouselRef.current?.prev();
        closeDrawer();
        await waitForCarouselAnimationEnd();
        resetCreateEditTrainingCard();
    };

    const handleTrainingCreatedOrEdited = async () => {
        carouselRef.current?.prev();
        await waitForCarouselAnimationEnd();
        resetCreateEditTrainingCard();
    };

    const closePopover = async () => {
        popoverOpenChange(false);
        await waitForPopoverAnimationEnd();
        resetState();
    };

    const handlePopoverOpenChange = (open: boolean) => {
        if (!open) return closePopover();
        popoverOpenChange(true);
    };

    const handleSaveTrainingError = () => {
        closePopover();
        const modal = Modal.error({
            title: 'При сохранении данных произошла ошибка',
            content: <Typography.Paragraph>Придётся попробовать ещё раз</Typography.Paragraph>,
            okText: 'Закрыть',
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
                    <ExerciseDrawer {...state.exerciseDrawer} onClose={exercisesEditedOrCreated} />
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
                            onEditTraining={handleEditTraining}
                            createDisabled={state.createDisabled}
                            onCreateTraining={handleCreateTraining}
                            onClose={closePopover}
                        />
                        <CreateEditTrainingCard
                            {...state.createEditTrainingCard}
                            onAddExercise={addExercise}
                            onEditExercise={editExercise}
                            onCancel={handleCancelCreateEditTraining}
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
