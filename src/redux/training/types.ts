export type Exercise = {
    _id: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation?: boolean;
};

export type Training = {
    _id: string;
    name: string;
    date: string; // ISO Date string
    isImplementation?: boolean;
    userId: string;
    parameters?: {
        repeat?: boolean;
        period?: number;
        jointTraining?: boolean;
        participants?: string[];
    };
    exercises: Exercise[];
};

export type CreateExerciseDTO = Omit<Exercise, '_id'>;

export type CreateTrainingDTO = Omit<Training, '_id' | 'userId' | 'exercises'> & {
    exercises: CreateExerciseDTO[];
};

export type EditTrainingDTO = CreateTrainingDTO;
