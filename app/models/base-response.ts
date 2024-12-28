export interface PaginationMeta {
    page: number;
    page_size: number;
    total_count: number;
    total_pages: number;
}

export interface ApiResponse<T> {
    data: T;
    meta: {
        message: string;
        pagination: PaginationMeta;
    };
}