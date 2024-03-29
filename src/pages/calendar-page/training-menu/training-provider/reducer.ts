import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { createDefaultExercise } from '@pages/calendar-page/utils';
import {
    TrainingType,
    TrainingTypeMap,
    selectTrainingTypeMap,
    selectTrainingTypes,
} from '@redux/catalogs';
import { Exercise, Training, selectTrainingsByDate } from '@redux/training';
import { Dispatch, PayloadAction, bindActionCreators, createSlice } from '@reduxjs/toolkit';
import moment, { Moment } from 'moment';
import { useMemo, useReducer } from 'react';
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
    currentScreen: 'trainings' | 'exercises';
    exerciseDrawer: {
        open: boolean;
        mode: ExerciseDrawerMode;
        trainingType: TrainingType;
        initialExercises: Exercise[];
    };
    createEditTrainingCard: (CreateFlow | EditFlow | ReadFlow) & {
        exercises: Exercise[];
        selectedTrainingType: TrainingType | null;
        availableTrainingTypes: TrainingType[];
    };
};

type LazyState = Pick<
    TrainingState,
    'trainingTypeMap' | 'trainingTypes' | 'trainings' | 'createDisabled' | 'isPast'
>;

const initState = (lazyState: LazyState): TrainingState => ({
    ...lazyState,
    currentScreen: 'trainings',
    popoverOpen: false,
    exerciseDrawer: {
        open: false,
        mode: 'create',
        initialExercises: [createDefaultExercise()],
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
            switchScreen(state, { payload }: PayloadAction<'trainings' | 'exercises'>) {
                state.currentScreen = payload;
            },
            resetState() {
                return initialState;
            },
            resetDrawerState(state) {
                state.exerciseDrawer = initialState.exerciseDrawer;
            },
            closeDrawer(state) {
                state.exerciseDrawer.open = false;
            },
            exercisesEditedOrCreated(state, action: PayloadAction<Exercise[]>) {
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
                    initialExercises: exercises.length ? exercises : [createDefaultExercise()],
                };
            },
            editExercise(state, { payload: trainingType }: PayloadAction<TrainingType>) {
                const { exercises, flow } = state.createEditTrainingCard;
                state.exerciseDrawer = {
                    trainingType,
                    open: true,
                    mode: flow,
                    initialExercises: exercises.length ? exercises : [createDefaultExercise()],
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

    const [state, dispatch] = useReducer(slice.reducer, slice.getInitialState());

    const actions = useMemo(
        () => bindActionCreators(slice.actions, dispatch as Dispatch),
        [slice.actions, dispatch],
    );

    return [state, actions, { trainingTypes, trainingTypeMap, trainings }] as const;
};
