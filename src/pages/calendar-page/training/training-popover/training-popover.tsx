import { Carousel } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useReducer, useRef } from 'react';
import { CalendarCellPopover } from '../../calendar-cell-popover';
import { CreateTrainingCard, CreateTrainingCardProps } from '../create-training-card';
import { TrainingCard, TrainingCardProps } from '../training-card';
import styles from './training-popover.module.less';
import { AddExercisesDrawer } from '../add-exercise-drawer';
import { TrainingType } from '@redux/catalogs';
import { CreateExerciseDTO } from '@redux/training';
import { useXss } from '@hooks/use-breakpoint';

type TrainingPopoverProps = TrainingCardProps & CreateTrainingCardProps;

type State = {
    drawerOpen: boolean;
    popoverOpen: boolean;
    addExerciseFlow: { trainingType: TrainingType; createdExercises: CreateExerciseDTO[] };
};

const initialState: State = {
    popoverOpen: false,
    drawerOpen: false,
    addExerciseFlow: { trainingType: { key: 'back', name: '', color: '' }, createdExercises: [] },
};

type Action =
    | { type: 'POPOVER_OPEN_CHANGE'; payload: boolean }
    | { type: 'ADD_EXERCISE'; payload: TrainingType }
    | { type: 'DRAWER_CLOSED'; payload: CreateExerciseDTO[] };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'POPOVER_OPEN_CHANGE':
            return action.payload ? { ...state, popoverOpen: true } : initialState;

        case 'ADD_EXERCISE':
            return {
                ...state,
                drawerOpen: true,
                addExerciseFlow: { ...state.addExerciseFlow, trainingType: action.payload },
            };

        case 'DRAWER_CLOSED':
            return {
                ...state,
                drawerOpen: false,
                addExerciseFlow: { ...state.addExerciseFlow, createdExercises: action.payload },
            };

        default:
            throw new Error('Unknown action');
    }
};

const popoverOpenChange = (open: boolean) =>
    ({ type: 'POPOVER_OPEN_CHANGE', payload: open } as const);

const drawerClosed = (exercises: CreateExerciseDTO[]) =>
    ({ type: 'DRAWER_CLOSED', payload: exercises } as const);

const addExercise = (trainingType: TrainingType) =>
    ({ type: 'ADD_EXERCISE', payload: trainingType } as const);

export const TrainingPopover = ({ date, trainingTypes }: TrainingPopoverProps) => {
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
                        dots={false}
                        speed={200}
                        effect='fade'
                    >
                        <TrainingCard
                            date={date}
                            onClose={() => dispatch(popoverOpenChange(false))}
                            onCreateTraining={() => carouselRef.current?.next()}
                        />
                        <CreateTrainingCard
                            trainingTypes={trainingTypes}
                            onCancel={() => carouselRef.current?.prev()}
                            onAddExercise={(trainingType) => dispatch(addExercise(trainingType))}
                        />
                    </Carousel>
                </>
            }
        />
    );
};
