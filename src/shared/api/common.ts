import { z } from 'zod';

export interface PaginationResponseMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: PaginationResponseMeta;
}

export interface PaginationRequestMeta {
    page?: number;
    limit?: number;
}

export interface SortingRequestMeta {
    sortBy?: 'createdAt' | 'likes';
    sortOrder?: 'asc' | 'desc';
}

export const apiErrorResponseSchema = z.object({
    message: z.string(),
    statusCode: z.number(),
    error: z.string().optional(),
});

export interface QueryHttpError<T = unknown> {
    data: T;
    status: number;
}

export type ApiErrorResponse = z.infer<typeof apiErrorResponseSchema>;

export type QueryApiError = QueryHttpError<ApiErrorResponse>;

export interface UploadedFile {
    _id: string;
    name: string;
    url: string;
}
