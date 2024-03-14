import { TrainingType, TrainingTypeDto } from '.';

const trainingTypeColorMap: Record<TrainingType['key'], string> = {
    legs: 'rgb(255, 77, 79)',
    hands: 'rgb(19, 194, 194)',
    strength: 'rgb(250, 219, 20)',
    back: 'rgb(250, 140, 22)',
    chest: 'rgb(82, 196, 26)',
};

export const mapTrainingTypeDto = (dto: TrainingTypeDto): TrainingType => ({
    ...dto,
    color: trainingTypeColorMap[dto.key],
});
