import { createEntityAdapter } from '@reduxjs/toolkit';

import { Training } from '.';

export const trainingAdapter = createEntityAdapter({
    selectId: (training: Training) => training._id,
});

export const trainingInitialState = trainingAdapter.getInitialState();

export const transformTrainingResponse = (dtos: Training[]) =>
    trainingAdapter.setAll(trainingInitialState, dtos);
