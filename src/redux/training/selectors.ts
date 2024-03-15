import { RootState } from '@redux/configure-store';
import { createSelector } from '@reduxjs/toolkit';
import { groupBy } from '@utils/groupBy';
import moment, { Moment } from 'moment';
import { Training, trainingApi } from '.';
import { trainingAdapter, trainingInitialState } from './adapter';

const selectTrainingListCacheEntry = trainingApi.endpoints.fetchTrainingList.select();

export const { selectAll: selectTrainingList, selectById: selectTrainingById } =
    trainingAdapter.getSelectors(
        (state: RootState) => selectTrainingListCacheEntry(state).data ?? trainingInitialState,
    );

const selectTrainingsGroupedByDate = createSelector(
    (state: RootState) => selectTrainingList(state),
    (list) => groupBy(list, (item) => moment(item.date).format('DD-MM-YYYY')),
);

const defaultTrainingList: Training[] = [];

export const selectTrainingsByDate = (date: Moment) => (state: RootState) =>
    selectTrainingsGroupedByDate(state)[date.format('DD-MM-YYYY')] ?? defaultTrainingList;
