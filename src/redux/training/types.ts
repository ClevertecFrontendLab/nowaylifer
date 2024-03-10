export type Exercise = {
    _id: string;
    name: string;
    replays: number;
    wight: number;
    approaches: number;
    isImplementation: boolean;
};

export type Training = {
    _id: string;
    name: string;
    date: string; // ISO Date string
    isImplementation?: false;
    userId: string;
    parameters?: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: Exercise[];
};

export type CreateTrainingDTO = Omit<Training, '_id' | 'userId' | 'exercises'> & {
    exercises: Omit<Exercise, '_id'>[];
};

export type ChangeTrainingDTO = CreateTrainingDTO;
