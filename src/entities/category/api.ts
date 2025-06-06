import { isEmpty, keyBy } from 'lodash-es';

import { ApiEndpoint, apiSlice } from '~/shared/api';
import { buildMediaSrc, isE2E } from '~/shared/util';

import { CATEGORY_STORAGE_KEY, isRootCategory } from './lib/util';
import { Category, CategoryState } from './types';

const normalizeCategoryIcon = ({ icon, ...rest }: Category) =>
    ({
        ...rest,
        icon: icon ? buildMediaSrc(icon) : icon,
    }) as Category;

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        categories: build.query<CategoryState, void>({
            keepUnusedDataFor: Infinity,
            query: () => ({ url: ApiEndpoint.CATEGORY }),
            transformResponse: (rawResult: Category[]) => {
                // HACK: sometimes tests don't return categories
                if (isE2E() && isEmpty(rawResult)) {
                    rawResult = [];
                }
                const normalized = rawResult.map(normalizeCategoryIcon);
                return {
                    rootCategories: normalized.filter(isRootCategory),
                    categoryById: keyBy(normalized, (c) => c._id),
                };
            },
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem(CATEGORY_STORAGE_KEY, JSON.stringify(result.data));
                } catch (error) {
                    console.error(error);
                }
            },
        }),
    }),
});
