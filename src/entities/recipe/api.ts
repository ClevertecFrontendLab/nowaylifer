import { createSelector } from '@reduxjs/toolkit';
import {
    BaseQueryFn,
    InfiniteQueryConfigOptions,
    TypedUseInfiniteQueryStateResult,
} from '@reduxjs/toolkit/query/react';
import { shuffle } from 'lodash-es';

import {
    ApiEndpoints,
    apiSlice,
    PaginatedResponse,
    PaginationRequestMeta,
    SortingRequestMeta,
    TypedQueryReturnValue,
} from '~/shared/api';

import { Recipe, RecipeWithAuthor } from './interface';

export interface RecipeRequestParams extends PaginationRequestMeta, SortingRequestMeta {
    searchString?: string;
    allergens?: string[];
    meat?: string[];
    garnish?: string[];
    subcategoriesIds?: string[];
}

const infiniteQueryOptions: InfiniteQueryConfigOptions<PaginatedResponse<Recipe>, number> = {
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
        typeof lastPage.meta?.totalPages === 'number' && lastPageParam < lastPage.meta.totalPages
            ? lastPageParam + 1
            : undefined,
};

const defaultRecipeRequestParams: RecipeRequestParams = {
    limit: 8,
};

const fixRecipesBySubCategoryResponse = (
    raw:
        | PaginatedResponse<Recipe>
        | (Omit<PaginatedResponse<Recipe>, 'data'> & { data: [Recipe[]] }),
): PaginatedResponse<Recipe> => {
    if (Array.isArray(raw.data?.[0])) {
        return { ...raw, data: raw.data[0] };
    }
    return raw as PaginatedResponse<Recipe>;
};

export const recipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        recipeById: build.query<RecipeWithAuthor, string>({
            query: (id) => ({ url: `${ApiEndpoints.RECIPE}/${id}` }),
        }),
        paginatedRecipes: build.infiniteQuery<
            PaginatedResponse<Recipe>,
            RecipeRequestParams,
            number
        >({
            infiniteQueryOptions,
            query: ({ queryArg: params, pageParam }) => ({
                url: ApiEndpoints.RECIPE,
                params: {
                    ...defaultRecipeRequestParams,
                    ...params,
                    page: pageParam,
                } satisfies RecipeRequestParams,
            }),
        }),
        recipes: build.query<Recipe[], RecipeRequestParams>({
            query: (params) => ({ url: ApiEndpoints.RECIPE, params }),
            transformResponse: (rawResult: PaginatedResponse<Recipe>) => rawResult.data,
        }),
        paginatedRecipesBySubCategory: build.infiniteQuery<
            PaginatedResponse<Recipe>,
            { subCategoryId: string } & RecipeRequestParams,
            number
        >({
            infiniteQueryOptions,
            query: ({ queryArg: { subCategoryId, ...params }, pageParam }) => {
                const hasParams = Object.values(params).filter(Boolean).length;
                return {
                    url: hasParams
                        ? ApiEndpoints.RECIPE
                        : `${ApiEndpoints.RECIPE_SUBCATEGORY}/${subCategoryId}`,
                    params: {
                        ...defaultRecipeRequestParams,
                        ...params,
                        page: pageParam,
                        subcategoriesIds: hasParams ? [subCategoryId] : undefined,
                    } satisfies RecipeRequestParams,
                };
            },
            transformResponse: fixRecipesBySubCategoryResponse,
            extraOptions: {
                errorLogInfoByStatus: {
                    404: {
                        title: 'Ошибка сервера',
                        description: 'Попробуйте поискать снова попозже',
                    },
                },
            },
        }),
        recipesBySubCategory: build.query<
            Recipe[],
            { subCategoryId: string } & RecipeRequestParams
        >({
            query: ({ subCategoryId, ...params }) => ({
                url: `${ApiEndpoints.RECIPE_SUBCATEGORY}/${subCategoryId}`,
                params,
            }),
            transformResponse: (raw: PaginatedResponse<Recipe>) =>
                fixRecipesBySubCategoryResponse(raw).data,
            extraOptions: {
                errorLogInfoByStatus: {
                    404: {
                        title: 'Ошибка сервера',
                        description: 'Попробуйте поискать снова попозже',
                    },
                },
            },
        }),
        relevantRecipes: build.query<Recipe[], { subCategoriesIds: string[]; maxRecipes?: number }>(
            {
                queryFn: async (
                    { maxRecipes = 5, subCategoriesIds },
                    { dispatch },
                ): Promise<TypedQueryReturnValue<Recipe[]>> => {
                    const promises = subCategoriesIds.map((id) =>
                        dispatch(
                            recipeApi.endpoints.recipesBySubCategory.initiate(
                                { subCategoryId: id, limit: 5 },
                                { subscribe: false },
                            ),
                        ).unwrap(),
                    );
                    const result = await Promise.all(promises);
                    const recipes: Recipe[] = shuffle(
                        result.flat().filter(Boolean).slice(0, maxRecipes),
                    );
                    return { data: recipes };
                },
            },
        ),
    }),
});

type RecipeInfiniteQueryState = TypedUseInfiniteQueryStateResult<
    PaginatedResponse<Recipe>,
    RecipeRequestParams | void,
    number,
    BaseQueryFn
>;

export const selectFlattenedRecipes = createSelector(
    [(state: RecipeInfiniteQueryState) => state.data],
    (data) => data?.pages.flatMap((page) => page.data).filter(Boolean),
);

export const selectFromRecipeInfiniteQueryResult = (state: RecipeInfiniteQueryState) => ({
    ...state,
    recipes: selectFlattenedRecipes(state),
});
