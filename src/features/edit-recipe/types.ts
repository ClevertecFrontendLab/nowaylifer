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

export interface EditRecipeHistoryState {
    editRecipe?: { event: 'created' | 'updated' | 'deleted' | 'draftSaved' };
}
