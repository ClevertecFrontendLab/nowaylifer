export interface Recipe {
    title: string;
    description: string;
    time: number;
    image: string;
    meat: string;
    garnish: string;
    portions: number;
    authorId: string;
    categoriesIds: string[];
    steps: { stepNumber: number; description: string; image: string }[];
    nutritionValue: {
        calories: number;
        protein: number;
        fats: number;
        carbohydrates: number;
    };
    ingredients: { title: string; count: string; measureUnit: string }[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
}

export interface Author {
    login: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    subscribers?: string[];
}

export interface RecipeWithAuthor extends Recipe {
    authorData?: Author;
}
