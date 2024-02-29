import { baseQueryBackend } from '@redux/base-query-backend';
import { createApi } from '@reduxjs/toolkit/query/react';
import { Review } from './types';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: baseQueryBackend({ minDelay: 1000 }),
    endpoints: (builder) => ({
        fetchAllReviews: builder.query<Review[], void>({
            query: () => ({
                url: '/feedback',
            }),
        }),
        createReview: builder.mutation({
            query: () => ({
                url: '/feedback',
                method: 'POST',
            }),
        }),
    }),
});

export const { useFetchAllReviewsQuery, useCreateReviewMutation } = reviewsApi;
