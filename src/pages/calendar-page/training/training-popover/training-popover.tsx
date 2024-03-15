import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { useXss } from '@hooks/use-breakpoint';
import { selectTrainingTypeMap } from '@redux/catalogs';
import { selectTrainingsByDate } from '@redux/training';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { Moment } from 'moment';
import { useReducer, useRef } from 'react';
import { CalendarCellPopover } from '../../calendar-cell-popover';
import { AddExercisesDrawer } from '../add-exercise-drawer';
import { CreateTrainingCard } from '../create-training-card';
import { TrainingCard } from '../training-card';
import { addExercise, drawerClosed, initialState, popoverOpenChange, reducer } from './reducer';
import styles from './training-popover.module.less';

type TrainingPopoverProps = {
    date: Moment;
};

export const TrainingPopover = ({ date }: TrainingPopoverProps) => {
    const trainings = useAppSelector(selectTrainingsByDate(date));
    const trainingTypeMap = useAppSelector(selectTrainingTypeMap);
    const [state, dispatch] = useReducer(reducer, initialState);
    const carouselRef = useRef<CarouselRef | null>(null);
    const xss = useXss();

    return (
        <CalendarCellPopover
            modal={xss}
            open={state.popoverOpen}
            onOpenChange={(open) => dispatch(popoverOpenChange(open))}
            overlayClassName={styles.TrainingPopover}
            overlayStyle={{ width: xss ? 312 : 264 }}
            content={
                <>
                    <AddExercisesDrawer
                        date={date}
                        open={state.drawerOpen}
                        onClose={(exercises) => dispatch(drawerClosed(exercises))}
                        trainingType={state.addExerciseFlow.trainingType}
                    />
                    <Carousel
                        className={styles.Carousel}
                        accessibility={false}
                        ref={carouselRef}
                        infinite={false}
                        easing='ease-in'
                        adaptiveHeight
                        swipe={false}
                        effect='fade'
                        dots={false}
                        speed={200}
                    >
                        <TrainingCard
                            date={date}
                            trainings={trainings}
                            trainingTypeMap={trainingTypeMap}
                            onClose={() => dispatch(popoverOpenChange(false))}
                            onCreateTraining={() => carouselRef.current?.next()}
                        />
                        <CreateTrainingCard
                            onCancel={() => carouselRef.current?.prev()}
                            onAddExercise={(trainingType) => dispatch(addExercise(trainingType))}
                        />
                    </Carousel>
                </>
            }
        />
    );
};
