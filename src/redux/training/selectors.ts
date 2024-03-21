import { RootState } from '@redux/configure-store';
import { createSelector } from '@reduxjs/toolkit';
import { groupBy } from '@utils/group-by';
import moment, { Moment } from 'moment';

import { trainingAdapter, trainingInitialState } from './adapter';
import { Training, trainingApi } from '.';

const selectTrainingListCacheEntry = trainingApi.endpoints.fetchTrainingList.select();

export const { selectAll: selectTrainingList, selectById: selectTrainingById } =
    trainingAdapter.getSelectors(
        (state: RootState) => selectTrainingListCacheEntry(state).data ?? trainingInitialState,
    );

const selectTrainingsGroupedByDate = createSelector(
    (state: RootState) => selectTrainingList(state),
    (list) => groupBy(list, (item) => moment(item.date).utc().format('DD-MM-YYYY')),
);

const defaultTrainingList: Training[] = [];

export const selectTrainingsByDate = (date: Moment) => (state: RootState) =>
    selectTrainingsGroupedByDate(state)[date.utc().format('DD-MM-YYYY')] ?? defaultTrainingList;
