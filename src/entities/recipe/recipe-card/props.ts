import { HTMLChakraProps } from '@chakra-ui/react';

import { RecipeCardRootProps } from './parts/Root';

export interface RecipeCardProps extends RecipeCardRootProps {
    renderTitle?: (styleProps: HTMLChakraProps<'div'>) => React.ReactNode;
}
