import { Button, ButtonProps, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { Recipe } from '~/entities/recipe';
import { BookmarkIcon } from '~/shared/ui/icons/bookmark';

import { reactToRecipeApi } from './api';

export interface BookmarkRecipeButtonProps extends Omit<ButtonProps, 'variant'> {
    recipe: Recipe;
    variant?: 'long' | 'short';
}

export const BookmarkRecipeButton = ({
    recipe,
    variant = 'long',
    ...props
}: BookmarkRecipeButtonProps) => {
    const Component = variant === 'long' ? BookmarkRecipeButtonLong : BookmarkRecipeButtonShort;
    const [bookmarkRecipe] = reactToRecipeApi.useBookmarkRecipeMutation();
    return <Component onClick={() => bookmarkRecipe(recipe._id)} {...props} />;
};

const BookmarkRecipeButtonLong = (props: ButtonProps) => (
    <Button
        bg='lime.400'
        size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
        leftIcon={<BookmarkIcon />}
        {...props}
    >
        Сохранить в закладки
    </Button>
);

const BookmarkRecipeButtonShort = (props: ButtonProps) => {
    const lg = useBreakpointValue({ base: false, lg: true });
    return lg ? (
        <Button variant='outline' size='sm' leftIcon={<BookmarkIcon />} {...props}>
            Сохранить
        </Button>
    ) : (
        <IconButton
            size='xs'
            variant='outline'
            aria-label='Сохранить'
            icon={<BookmarkIcon />}
            {...props}
        />
    );
};
