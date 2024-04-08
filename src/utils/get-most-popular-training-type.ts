import { TrainingTypeMap } from '@redux/catalogs';
import { Training } from '@redux/training';

const getTrainingWeight = (training: Training) =>
    training.exercises.reduce(
        (sum, { approaches, weight, replays }) => sum + approaches * weight * replays,
        0,
    );

export const getMostPopularTrainingType = (
    trainings: Training[],
    trainingTypesMap: TrainingTypeMap,
) => {
    if (!trainings.length) return undefined;

    const { training } = trainings.reduce(
        (acc, cur, idx) => {
            if (idx === 0) return acc;

            const weight = getTrainingWeight(cur);

            return acc.weight < weight ? { training: cur, weight } : acc;
        },
        { training: trainings[0], weight: getTrainingWeight(trainings[0]) },
    );

    return trainingTypesMap[training.name];
};
