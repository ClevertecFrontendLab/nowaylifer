export type TrainingType = {
    name: string;
    key: 'legs' | 'hands' | 'strength' | 'back' | 'chest';
    color: string;
};

export type TrainingTypeMap = Record<TrainingType['name'], TrainingType>;
export type TrainingTypeDto = Pick<TrainingType, 'name' | 'key'>;
