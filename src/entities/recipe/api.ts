import { createSelector } from '@reduxjs/toolkit';
import {
    BaseQueryFn,
    InfiniteQueryConfigOptions,
    TypedUseInfiniteQueryStateResult,
} from '@reduxjs/toolkit/query/react';
import { shuffle } from 'lodash';

import {
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

export const recipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        recipeById: build.query<RecipeWithAuthor, string>({
            query: (id) => ({
                url: `/recipe/${id}`,
                method: 'GET',
            }),
        }),
        paginatedRecipes: build.infiniteQuery<
            PaginatedResponse<Recipe>,
            RecipeRequestParams,
            number
        >({
            infiniteQueryOptions,
            query: ({ queryArg: params, pageParam }) => ({
                url: '/recipe',
                method: 'GET',
                params: {
                    ...defaultRecipeRequestParams,
                    ...params,
                    page: pageParam,
                } satisfies RecipeRequestParams,
            }),
        }),
        recipes: build.query<Recipe[], RecipeRequestParams>({
            query: (params) => ({
                url: '/recipe',
                method: 'GET',
                params,
            }),
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
                    url: hasParams ? '/recipe' : `/recipe/category/${subCategoryId}`,
                    params: {
                        ...defaultRecipeRequestParams,
                        ...params,
                        page: pageParam,
                        subcategoriesIds: hasParams ? [subCategoryId] : undefined,
                    } satisfies RecipeRequestParams,
                };
            },
            transformResponse: (
                rawResponse:
                    | PaginatedResponse<Recipe>
                    | (Omit<PaginatedResponse<Recipe>, 'data'> & { data: [Recipe[]] }),
            ): PaginatedResponse<Recipe> => {
                // taking into account error in tests response data
                if (Array.isArray(rawResponse.data?.[0])) {
                    return { ...rawResponse, data: rawResponse.data[0] };
                }
                return rawResponse as PaginatedResponse<Recipe>;
            },
        }),
        recipesBySubCategory: build.query<
            Recipe[],
            { subCategoryId: string } & RecipeRequestParams
        >({
            query: ({ subCategoryId, ...params }) => ({
                url: `/recipe/category/${subCategoryId}`,
                method: 'GET',
                params,
            }),
            transformResponse: (rawResult: PaginatedResponse<Recipe>) => rawResult.data,
        }),
        relevantRecipes: build.query<Recipe[], { subCategoriesIds: string[]; maxRecipes?: number }>(
            {
                queryFn: async (
                    { maxRecipes = 5, subCategoriesIds },
                    { dispatch },
                ): TypedQueryReturnValue<Recipe[]> => {
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
