import { RootState } from '@redux/configure-store';

import { tariffsAdapter, tariffsInitialState } from './tariffs.adapter';
import { trainingTypeAdapter, trainingTypesInitialState } from './training-type.adapter';
import { catalogsApi } from '.';

const selectTrainingCatalogCacheEntry = catalogsApi.endpoints.fetchTrainingCatalog.select();
const selectTariffsCacheEntry = catalogsApi.endpoints.fetchTariffs.select();

const selectors = trainingTypeAdapter.getSelectors(
    (state: RootState) => selectTrainingCatalogCacheEntry(state).data ?? trainingTypesInitialState,
);

export const { selectAll: selectTrainingTypes, selectEntities: selectTrainingTypeMap } = selectors;

export const selectTrainingTypeByName = (name?: string) => (state: RootState) =>
    typeof name === 'string' ? selectors.selectById(state, name) : undefined;

export const { selectAll: selectTariffs } = tariffsAdapter.getSelectors(
    (state: RootState) => selectTariffsCacheEntry(state).data ?? tariffsInitialState,
);
