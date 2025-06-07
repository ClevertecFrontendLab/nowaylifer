export interface Blog extends Pick<Blogger, 'firstName' | 'lastName' | 'login' | 'notes'> {
    _id: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    newRecipesCount: number;
}

export interface Note {
    date: string;
    text: string;
}

export interface Blogger {
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
    bloggerInfo: Blogger;
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
}
