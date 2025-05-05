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
