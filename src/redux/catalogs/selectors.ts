import { RootState } from '@redux/configure-store';
import { catalogsApi } from '.';
import { trainingTypeAdapter, trainingTypesInitialState } from './training-type.adapter';

const selectTrainingCatalogCacheEntry = catalogsApi.endpoints.fetchTrainingCatalog.select();

export const {
    selectAll: selectTrainingTypes,
    selectEntities: selectTrainingTypeMap,
    selectById: selectTrainingTypeByName,
} = trainingTypeAdapter.getSelectors(
    (state: RootState) => selectTrainingCatalogCacheEntry(state).data ?? trainingTypesInitialState,
);
