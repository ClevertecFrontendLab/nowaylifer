export interface RootCategory {
    _id: string;
    title: string;
    category: string;
    icon: string;
    description: string;
    subCategories: SubCategory[];
    rootCategoryId?: undefined;
}

export interface SubCategory {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
    icon?: string;
    description?: string;
    subCategories?: undefined;
}

export type Category = RootCategory | SubCategory;
