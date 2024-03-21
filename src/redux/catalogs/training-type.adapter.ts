import { createEntityAdapter } from '@reduxjs/toolkit';

import { TrainingType, TrainingTypeDto } from '.';

const trainingTypeColorMap: Record<TrainingType['key'], string> = {
    legs: 'rgb(255, 77, 79)',
    hands: 'rgb(19, 194, 194)',
    strength: 'rgb(250, 219, 20)',
    back: 'rgb(250, 140, 22)',
    chest: 'rgb(82, 196, 26)',
};

const mapTrainingTypeDtos = (dtos: TrainingTypeDto[]): TrainingType[] =>
    dtos.map((dto) => ({ ...dto, color: trainingTypeColorMap[dto.key] }));

export const trainingTypeAdapter = createEntityAdapter({
    selectId: (trainingType: TrainingType) => trainingType.name,
});

export const trainingTypesInitialState = trainingTypeAdapter.getInitialState();

export const transformTrainingCatalogResponse = (dtos: TrainingTypeDto[]) =>
    trainingTypeAdapter.setAll(trainingTypesInitialState, mapTrainingTypeDtos(dtos));
