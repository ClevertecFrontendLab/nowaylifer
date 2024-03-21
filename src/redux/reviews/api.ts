import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';

import { CreateReviewDTO, Review } from './types';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: baseQueryBackend({ minDelay: 1000 }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        fetchAllReviews: builder.query<Review[], void>({
            query: () => '/feedback',
            providesTags: ['Review'],
        }),
        addReview: builder.mutation<void, CreateReviewDTO>({
            query: (dto) => ({
                url: '/feedback',
                method: 'POST',
                body: dto,
            }),
            invalidatesTags: (_arg, error) => (error ? [] : ['Review']),
        }),
    }),
});

export const { useFetchAllReviewsQuery, useAddReviewMutation } = reviewsApi;
