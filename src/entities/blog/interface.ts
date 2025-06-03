export interface Blog {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: Note[];
    newRecipesCount: number;
}

export interface Note {
    date: string;
    text: string;
}
