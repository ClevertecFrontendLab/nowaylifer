import { Exercise } from '@redux/training';

export const createDefaultExercise = (): Exercise => ({
    _id: crypto.randomUUID(),
    name: '',
    replays: 1,
    weight: 0,
    approaches: 3,
});
