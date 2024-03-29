export type TrainingType = {
    name: string;
    key: 'legs' | 'hands' | 'strength' | 'back' | 'chest';
    color: string;
};

export type TrainingTypeMap = Record<TrainingType['name'], TrainingType>;
export type TrainingTypeDto = Pick<TrainingType, 'name' | 'key'>;

export type Tariff = {
    _id: string;
    name: string;
    cover: string; // path to image
    periods: Array<{
        text: string;
        cost: number;
        days: number;
    }>;
};

export type TariffDto = Omit<Tariff, 'cover'>;
