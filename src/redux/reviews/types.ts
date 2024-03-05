export type Review = {
    id: string;
    fullName: string | null;
    imageSrc: string | null;
    message: string | null;
    rating: number;
    createdAt: string;
};

export type CreateReviewDTO = {
    rating: number;
    message?: string;
};
