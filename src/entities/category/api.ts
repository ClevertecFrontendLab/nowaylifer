import { isEmpty, keyBy } from 'lodash-es';

import { ApiEndpoints, apiSlice } from '~/shared/api';
import { isE2E } from '~/shared/util';

import { Category, RootCategory } from './interface';
import { CATEGORY_STORAGE_KEY, isRootCategory } from './lib/util';

export type CategoryById = Record<string, Category>;

export interface CategoryState {
    rootCategories: RootCategory[];
    categoryById: CategoryById;
}

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        categories: build.query<CategoryState, void>({
            keepUnusedDataFor: Infinity,
            query: () => ({ url: ApiEndpoints.CATEGORY }),
            transformResponse: (rawResult: Category[]) => {
                if (isE2E() && isEmpty(rawResult)) {
                    rawResult = [];
                }
                return {
                    rootCategories: rawResult.filter(isRootCategory),
                    categoryById: keyBy(rawResult, (c) => c._id),
                };
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(result.data));
                } catch {
                    // ignore
                }
            },
        }),
    }),
});
