import { Button, ButtonProps } from '@chakra-ui/react';

import { ActiveCategories, CategoryById } from '~/entities/category';
import { buildRecipePath, Recipe } from '~/entities/recipe';
import { EditIcon } from '~/shared/ui/icons/edit';
import { Link } from '~/shared/ui/link';

export interface UpdateRecipeButtonProps extends ButtonProps {
    recipe: Recipe;
    categoryById: CategoryById;
    activeCategories?: ActiveCategories;
}

export const UpdateRecipeButton = ({
    recipe,
    categoryById,
    activeCategories,
    ...props
}: UpdateRecipeButtonProps) => (
    <Button
        as={Link}
        to={`/edit${buildRecipePath(recipe, categoryById, activeCategories)}`}
        variant='outline'
        leftIcon={<EditIcon />}
        size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
        {...props}
    >
        Редактировать рецепт
    </Button>
);
