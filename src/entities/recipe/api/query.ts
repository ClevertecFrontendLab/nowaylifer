import { createSelector } from '@reduxjs/toolkit';
import {
    BaseQueryFn,
    InfiniteQueryConfigOptions,
    TypedUseInfiniteQueryStateResult,
} from '@reduxjs/toolkit/query/react';
import { isNumber, shuffle } from 'lodash-es';

import {
    ApiEndpoint,
    apiSlice,
    PaginatedResponse,
    PaginationRequestMeta,
    SortingRequestMeta,
    TypedQueryReturnValue,
} from '~/shared/api';
import { joinPath } from '~/shared/router/util';

import { Recipe } from '../interface';
import { RecipeEndpointName } from './endpoint-name';
import { errorMeta } from './error-meta';
import { recipeMapper } from './mapper';

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
        isNumber(lastPage.meta?.totalPages) && lastPageParam < lastPage.meta.totalPages
            ? lastPageParam + 1
            : undefined,
};

const defaultRecipeRequestParams: RecipeRequestParams = {
    limit: 8,
};

export const recipeApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        [RecipeEndpointName.RecipeById]: build.query<Recipe, string>({
            query: (id) => ({ url: joinPath(ApiEndpoint.RECIPE, id) }),
            transformResponse: recipeMapper,
            providesTags: ['Recipe'],
        }),
        [RecipeEndpointName.RecipesByUser]: build.query<Recipe[], string>({
            query: (userId) => ({ url: joinPath(ApiEndpoint.RECIPE, 'user', userId) }),
            transformResponse: (data: { recipes: Recipe[] }) => data.recipes.map(recipeMapper),
            providesTags: ['Recipe'],
        }),
        [RecipeEndpointName.PaginatedRecipes]: build.infiniteQuery<
            PaginatedResponse<Recipe>,
            RecipeRequestParams,
            number
        >({
            infiniteQueryOptions,
            query: ({ queryArg: params, pageParam }) => ({
                url: ApiEndpoint.RECIPE,
                params: {
                    ...defaultRecipeRequestParams,
                    ...params,
                    page: pageParam,
                } satisfies RecipeRequestParams,
            }),
            transformResponse: ({ data: recipes, meta }: PaginatedResponse<Recipe>) => ({
                meta,
                data: recipes.map(recipeMapper),
            }),
            providesTags: [{ type: 'Recipe', id: 'LIST' }],
            extraOptions: { errorMetaByStatus: errorMeta.paginatedRecipes },
        }),

        [RecipeEndpointName.Recipes]: build.query<Recipe[], RecipeRequestParams>({
            query: (params) => ({ url: ApiEndpoint.RECIPE, params }),
            transformResponse: (rawResult: PaginatedResponse<Recipe>) =>
                rawResult.data.map(recipeMapper),
            providesTags: [{ type: 'Recipe', id: 'LIST' }],
        }),

        [RecipeEndpointName.PaginatedRecipesBySubCategory]: build.infiniteQuery<
            PaginatedResponse<Recipe>,
            { subCategoryId: string } & RecipeRequestParams,
            number
        >({
            infiniteQueryOptions,
            query: ({ queryArg: { subCategoryId, ...params }, pageParam }) => {
                const hasParams = Object.values(params).filter(Boolean).length;
                return {
                    url: hasParams
                        ? ApiEndpoint.RECIPE
                        : joinPath(ApiEndpoint.RECIPE_SUBCATEGORY, subCategoryId),
                    params: {
                        ...defaultRecipeRequestParams,
                        ...params,
                        page: pageParam,
                        subcategoriesIds: hasParams ? [subCategoryId] : undefined,
                    } satisfies RecipeRequestParams,
                };
            },
            transformResponse: ({ data: recipes = [], meta }: PaginatedResponse<Recipe>) => ({
                meta,
                data: recipes.map(recipeMapper),
            }),
            providesTags: [{ type: 'Recipe', id: 'LIST' }],
            extraOptions: { errorMetaByStatus: errorMeta.paginatedRecipesBySubCategory },
        }),

        [RecipeEndpointName.RecipesBySubCategory]: build.query<
            Recipe[],
            { subCategoryId: string } & RecipeRequestParams
        >({
            query: ({ subCategoryId, ...params }) => ({
                url: joinPath(ApiEndpoint.RECIPE_SUBCATEGORY, subCategoryId),
                params,
            }),
            transformResponse: (raw: PaginatedResponse<Recipe>) => raw.data.map(recipeMapper),
            providesTags: [{ type: 'Recipe', id: 'LIST' }],
            extraOptions: { errorMetaByStatus: errorMeta.recipesBySubCategory },
        }),

        [RecipeEndpointName.RelevantRecipes]: build.query<
            Recipe[],
            { subCategoriesIds: string[]; maxRecipes?: number }
        >({
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
            providesTags: [{ type: 'Recipe', id: 'LIST' }],
        }),
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
