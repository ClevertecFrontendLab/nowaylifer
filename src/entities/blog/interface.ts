export interface Blog {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes?: Note[];
    newRecipesCount: number;
}

export interface Note {
    date: string;
    text: string;
}

// TODO: move to user entity directory
export interface User {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    notes?: Note[];
    recipesIds: string[];
    subscribers: string[];
    subscriptions: string[];
}

export interface BlogDetailed {
    bloggerInfo: User;
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
}
