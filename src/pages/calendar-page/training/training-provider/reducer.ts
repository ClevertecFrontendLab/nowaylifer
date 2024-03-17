import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    TrainingType,
    TrainingTypeMap,
    selectTrainingTypeMap,
    selectTrainingTypes,
} from '@redux/catalogs';
import { CreateExerciseDTO, Exercise, Training, selectTrainingsByDate } from '@redux/training';
import { Dispatch, PayloadAction, bindActionCreators, createSlice } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import { useMemo } from 'react';
import useThunkReducer from 'react-hook-thunk-reducer';
import { ExerciseDrawerMode } from '../exercise-drawer/exercise-drawer';

export type CreateFlow = {
    flow: 'create';
    training?: null;
};

export type EditFlow = {
    flow: 'edit';
    training: Training;
};

export type ReadFlow = {
    flow: 'read';
    training?: Training | null;
};

export type TrainingState = {
    readonly trainingTypeMap: TrainingTypeMap;
    readonly trainingTypes: TrainingType[];
    readonly trainings: Training[];
    readonly createDisabled: boolean;
    readonly isPast: boolean;
    popoverOpen: boolean;
    exerciseDrawer: {
        open: boolean;
        mode: ExerciseDrawerMode;
        trainingType: TrainingType;
        initialExercises: (Exercise | CreateExerciseDTO)[];
    };
    createEditTrainingCard: (CreateFlow | EditFlow | ReadFlow) & {
        exercises: (Exercise | CreateExerciseDTO)[];
        selectedTrainingType: TrainingType | null;
        availableTrainingTypes: TrainingType[];
    };
};

type LazyState = Pick<
    TrainingState,
    'trainingTypeMap' | 'trainingTypes' | 'trainings' | 'createDisabled' | 'isPast'
>;

export const defaultExercise: CreateExerciseDTO = {
    name: '',
    replays: 1,
    weight: 0,
    approaches: 3,
};

const initState = (lazyState: LazyState): TrainingState => ({
    ...lazyState,
    popoverOpen: false,
    exerciseDrawer: {
        open: false,
        mode: 'create',
        initialExercises: [defaultExercise],
        trainingType: lazyState.trainingTypes[0],
    },
    createEditTrainingCard: {
        flow: 'create',
        exercises: [],
        training: null,
        selectedTrainingType: null,
        availableTrainingTypes: lazyState.trainingTypes,
    },
});

const generateSlice = (lazyState: Omit<LazyState, 'createDisabled'>) => {
    const getAvailableTrainingTypes = (trainingToEdit?: Training) =>
        lazyState.trainingTypes.filter(
            (type) =>
                type.name === trainingToEdit?.name ||
                !lazyState.trainings.some((training) => training.name === type.name),
        );

    const initialState = initState({
        ...lazyState,
        createDisabled: lazyState.isPast || !getAvailableTrainingTypes().length,
    });

    return createSlice({
        name: 'training',
        initialState: initialState,
        reducers: {
            popoverOpenChange(state, { payload: open }: PayloadAction<boolean>) {
                state.popoverOpen = open;
                if (!open) state.exerciseDrawer.open = false;
            },
            resetState() {
                return initialState;
            },
            closeDrawer(state) {
                state.exerciseDrawer.open = false;
            },
            exercisesEditedOrCreated(
                state,
                action: PayloadAction<(CreateExerciseDTO | Exercise)[]>,
            ) {
                state.exerciseDrawer.open = false;
                if (action.payload.length) {
                    state.createEditTrainingCard.exercises = action.payload;
                }
            },
            addExercise(state, { payload: trainingType }: PayloadAction<TrainingType>) {
                const { exercises } = state.createEditTrainingCard;
                state.exerciseDrawer = {
                    trainingType,
                    open: true,
                    mode: 'create',
                    initialExercises: exercises.length ? exercises : [defaultExercise],
                };
            },
            editExercise(state, { payload: trainingType }: PayloadAction<TrainingType>) {
                const { exercises, flow } = state.createEditTrainingCard;
                state.exerciseDrawer = {
                    trainingType,
                    open: true,
                    mode: flow,
                    initialExercises: exercises.length ? exercises : [defaultExercise],
                };
            },
            createTraining(state) {
                state.createEditTrainingCard.flow = 'create';
                state.createEditTrainingCard.availableTrainingTypes = getAvailableTrainingTypes();
            },
            editTraining(state, { payload: training }: PayloadAction<Training>) {
                state.createEditTrainingCard = {
                    training,
                    flow: training.isImplementation ? 'read' : 'edit',
                    exercises: training.exercises,
                    selectedTrainingType: state.trainingTypeMap[training.name],
                    availableTrainingTypes: getAvailableTrainingTypes(training),
                };
            },
            resetCreateEditTrainingCard(state) {
                state.createEditTrainingCard = initialState.createEditTrainingCard;
            },
            selectTrainingType(state, { payload }: PayloadAction<TrainingType>) {
                state.createEditTrainingCard.selectedTrainingType = payload;
            },
        },
    });
};

export const useTrainingSlice = (date: Moment) => {
    const trainingTypes = useAppSelector(selectTrainingTypes);
    const trainingTypeMap = useAppSelector(selectTrainingTypeMap);
    const trainings = useAppSelector(selectTrainingsByDate(date));

    const isPast = date.isBefore(moment());

    const slice = useMemo(
        () => generateSlice({ trainingTypes, trainingTypeMap, trainings, isPast }),
        [trainingTypes, trainingTypeMap, trainings, isPast],
    );

    const [state, dispatch] = useThunkReducer(slice.reducer, slice.getInitialState());

    const actions = useMemo(
        () => bindActionCreators(slice.actions, dispatch as Dispatch),
        [slice.actions, dispatch],
    );

    return [state, actions, { trainingTypes, trainingTypeMap, trainings }] as const;
};
