import { createContext, PropsWithChildren, useMemo } from 'react';
import { TrainingType, TrainingTypeMap } from '@redux/catalogs';
import { Training } from '@redux/training';
import { Moment } from 'moment';

import { TrainingState, useTrainingSlice } from './training-provider.reducer';

type TrainingContext = {
    date: Moment;
    isPast: boolean;
    trainings: Training[];
    trainingTypes: TrainingType[];
    trainingTypeMap: TrainingTypeMap;
};

export const TrainingContext = createContext<TrainingContext | null>(null);
export const TrainingStateContext = createContext<TrainingState | null>(null);
export const TrainingActionsContext = createContext<ReturnType<typeof useTrainingSlice>[1] | null>(
    null,
);

type TrainingProviderProps = PropsWithChildren & {
    date: Moment;
};

export function TrainingProvider({ date, children }: TrainingProviderProps) {
    const [state, actions, { trainings, trainingTypeMap, trainingTypes }] = useTrainingSlice(date);

    const trainingContext = useMemo(
        () => ({
            date,
            trainings,
            trainingTypes,
            trainingTypeMap,
            isPast: state.isPast,
        }),
        [trainings, trainingTypeMap, trainingTypes, state.isPast, date],
    );

    return (
        <TrainingStateContext.Provider value={state}>
            <TrainingActionsContext.Provider value={actions}>
                <TrainingContext.Provider value={trainingContext}>
                    {children}
                </TrainingContext.Provider>
            </TrainingActionsContext.Provider>
        </TrainingStateContext.Provider>
    );
}
