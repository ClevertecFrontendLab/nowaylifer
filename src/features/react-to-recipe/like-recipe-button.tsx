import { Button, ButtonProps } from '@chakra-ui/react';

import { Recipe } from '~/entities/recipe';
import { EmojiHeartEyesIcon } from '~/shared/ui/icons/emoji-heart-eyes';

import { reactToRecipeApi } from './api';

export interface LikeRecipeButtonProps extends ButtonProps {
    recipe: Recipe;
}

export const LikeRecipeButton = ({ recipe, ...props }: LikeRecipeButtonProps) => {
    const [likeRecipe] = reactToRecipeApi.useLikeRecipeMutation();
    return (
        <Button
            variant='outline'
            size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
            leftIcon={<EmojiHeartEyesIcon />}
            onClick={() => likeRecipe(recipe._id)}
            {...props}
        >
            Оценить рецепт
        </Button>
    );
};
