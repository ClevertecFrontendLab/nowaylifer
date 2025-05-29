import { IconButton, IconButtonProps } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { Recipe } from '~/entities/recipe';
import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { TrashCanIcon } from '~/shared/ui/icons/trash-can';

import { editRecipeApi } from './api/query';
import { EditRecipeHistoryState } from './types';

export interface DeleteRecipeButtonProps extends Omit<IconButtonProps, 'aria-label'> {
    recipe: Recipe;
}

export const DeleteRecipeButton = ({ recipe, ...props }: DeleteRecipeButtonProps) => {
    const [deleteRecipe, { isLoading }] = editRecipeApi.useDeleteRecipeMutation();
    const navigate = useNavigate();

    useAppLoader(isLoading);

    const handleClick = async () => {
        const res = await deleteRecipe(recipe._id);
        if (res.error) return;
        navigate(RoutePath.Main, {
            state: { editRecipe: { event: 'deleted' } } satisfies EditRecipeHistoryState,
        });
    };

    return (
        <IconButton
            variant='ghost'
            icon={<TrashCanIcon />}
            aria-label='Удалить рецепт'
            size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
            onClick={handleClick}
            {...props}
        />
    );
};
