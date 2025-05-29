import { HTMLChakraProps } from '@chakra-ui/react';

import { RecipeCardRootProps } from './parts/root';

export interface RecipeCardProps extends RecipeCardRootProps {
    renderTitle?: (styleProps: HTMLChakraProps<'div'>) => React.ReactNode;
    actionSlot?: React.ReactNode;
}
