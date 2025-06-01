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
        variant='outline'
        leftIcon={<EditIcon />}
        size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
        to={buildRecipePath(recipe, categoryById, { edit: true, activeCategories })}
        {...props}
    >
        Редактировать рецепт
    </Button>
);
