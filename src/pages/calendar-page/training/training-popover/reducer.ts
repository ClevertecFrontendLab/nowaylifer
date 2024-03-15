import { TrainingType } from '@redux/catalogs';
import { CreateExerciseDTO, Training } from '@redux/training';

type State = {
    drawerOpen: boolean;
    popoverOpen: boolean;
    trainings: Training[];
    newTrainings: Training[];
    addExerciseFlow: { trainingType: TrainingType; createdExercises: CreateExerciseDTO[] };
};

export const initialState: State = {
    popoverOpen: false,
    drawerOpen: false,
    trainings: [],
    newTrainings: [],
    addExerciseFlow: { trainingType: { key: 'back', name: '', color: '' }, createdExercises: [] },
};

type Action =
    | { type: 'POPOVER_OPEN_CHANGE'; payload: boolean }
    | { type: 'ADD_EXERCISE'; payload: TrainingType }
    | { type: 'DRAWER_CLOSED'; payload: CreateExerciseDTO[] };

export const reducer = (state: State, action: Action): State => {
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

export const popoverOpenChange = (open: boolean) =>
    ({ type: 'POPOVER_OPEN_CHANGE', payload: open } as const);

export const drawerClosed = (exercises: CreateExerciseDTO[]) =>
    ({ type: 'DRAWER_CLOSED', payload: exercises } as const);

export const addExercise = (trainingType: TrainingType) =>
    ({ type: 'ADD_EXERCISE', payload: trainingType } as const);
