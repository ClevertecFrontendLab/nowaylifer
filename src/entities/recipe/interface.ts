export interface Recipe {
    id: string;
    title: string;
    description: string;
    category: string[];
    subcategory: string[];
    image: string;
    bookmarks: number;
    likes: number;
    date: string;
    time: string;
    recommendation?: { displayName: string; avatar?: string };
    portions: number;
    nutritionValue: { calories: number; proteins: number; fats: number; carbohydrates: number };
    ingredients: { title: string; count: number; measureUnit: string }[];
    steps: { stepNumber: number; description: string; image?: string }[];
    meat?: string;
    side?: string;
}

export interface RecipeSubcategory {
    index: number;
    label: string;
    slug: string;
}

export interface RecipeCategory {
    index: number;
    label: string;
    iconSrc: string;
    slug: string;
    description: string;
    subcategories: Record<string, RecipeSubcategory>;
}
