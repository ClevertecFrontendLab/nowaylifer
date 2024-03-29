import { CreateExerciseDTO, Exercise } from '.';

export const createExerciseDraft = ({
    _id = crypto.randomUUID(),
    name = '',
    replays = 1,
    weight = 0,
    approaches = 3,
    isImplementation = false,
}: Partial<Exercise> = {}) => ({
    _id,
    name,
    replays,
    weight,
    approaches,
    isImplementation,
    toJSON(): CreateExerciseDTO {
        const { _id: _, toJSON, ...dto } = this;

        return dto;
    },
});
