import { useXss } from '@hooks/use-breakpoint';
import { Training } from '@redux/training';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useRef } from 'react';
import { CalendarCellPopover } from '../../calendar-cell-popover';
import { CreateEditTrainingCard } from '../create-training-card';
import { ExerciseDrawer } from '../exercise-drawer';
import { TrainingCard } from '../training-card';
import { useTrainingActions, useTrainingState } from '../training-provider';
import styles from './training-popover.module.less';

const CAROUSEL_SPEED = 200;

const waitForCarouselAnimationEnd = () => new Promise((res) => setTimeout(res, CAROUSEL_SPEED + 5));

export const TrainingPopover = () => {
    const carouselRef = useRef<CarouselRef | null>(null);
    const state = useTrainingState();
    const xss = useXss();
    const {
        cancelCreateEditTraining,
        popoverOpenChange,
        trainingCreated,
        createTraining,
        editTraining,
        drawerClosed,
        editExercise,
        addExercise,
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
        await waitForCarouselAnimationEnd();
        cancelCreateEditTraining();
    };

    const handleTrainingCreated = async () => {
        carouselRef.current?.prev();
        await waitForCarouselAnimationEnd();
        trainingCreated();
    };

    return (
        <CalendarCellPopover
            modal={xss}
            open={state.popoverOpen}
            overlayClassName={styles.TrainingPopover}
            overlayStyle={{ width: xss ? 312 : 264 }}
            onOpenChange={popoverOpenChange}
            content={
                <>
                    <ExerciseDrawer {...state.exerciseDrawer} onClose={drawerClosed} />
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
                            onClose={() => popoverOpenChange(false)}
                        />
                        <CreateEditTrainingCard
                            {...state.createEditTrainingCard}
                            onCancel={handleCancelCreateEditTraining}
                            onAddExercise={addExercise}
                            onEditExercise={editExercise}
                            onTrainingCreated={handleTrainingCreated}
                        />
                    </Carousel>
                </>
            }
        />
    );
};
