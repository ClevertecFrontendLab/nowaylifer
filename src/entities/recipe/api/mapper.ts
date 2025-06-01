import { buildMediaSrc } from '~/shared/util';

import { Recipe } from '../interface';

const normalizeRecipeImages = <T extends Recipe>(recipe: T): T => ({
    ...recipe,
    image: buildMediaSrc(recipe.image),
    steps: recipe.steps.map(({ image, ...rest }) => ({
        ...rest,
        image: image ? buildMediaSrc(image) : image,
    })),
});

export const recipeMapper = <T extends Recipe>(recipe: T): T => normalizeRecipeImages(recipe);
