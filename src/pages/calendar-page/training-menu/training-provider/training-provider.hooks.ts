import { useInvariantContext } from '@hooks/use-invariant-context';

import { TrainingActionsContext, TrainingContext, TrainingStateContext } from './training-provider';

export const useTraining = () => useInvariantContext(TrainingContext);
export const useTrainingState = () => useInvariantContext(TrainingStateContext);
export const useTrainingActions = () => useInvariantContext(TrainingActionsContext);
