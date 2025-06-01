import { Recipe } from '~/entities/recipe';

export interface MeasureUnit {
    _id: string;
    name: string;
}

export interface RecipeDraft
    extends Omit<
        Recipe,
        | '_id'
        | 'createdAt'
        | 'authorId'
        | 'nutritionValue'
        | 'likes'
        | 'views'
        | 'bookmarks'
        | 'garnish'
        | 'meat'
    > {}

// published is either created or updated
export type EditRecipeEvent = 'published' | 'deleted' | 'draftSaved';

export interface EditRecipeHistoryState {
    editRecipe?: { event: EditRecipeEvent };
}
