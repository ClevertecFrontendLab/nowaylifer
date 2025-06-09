export interface Ingredient {
    title: string;
    count: string | number;
    measureUnit: string;
}

export interface Step {
    stepNumber: number;
    description: string;
    image?: string | null;
}

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
    steps: Step[];
    nutritionValue: {
        calories: number;
        protein: number;
        fats: number;
        carbohydrates: number;
    };
    ingredients: Ingredient[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
}
