import { useInvariantContext } from '@hooks/use-invariant-context';
import { TrainingContext, TrainingActionsContext, TrainingStateContext } from './training-provider';

export const useTraining = () => useInvariantContext(TrainingContext);
export const useTrainingState = () => useInvariantContext(TrainingStateContext);
export const useTrainingActions = () => useInvariantContext(TrainingActionsContext);
