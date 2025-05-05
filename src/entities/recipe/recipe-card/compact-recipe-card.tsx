import { Button, HStack, Image } from '@chakra-ui/react';

import { Link } from '~/shared/ui/link';
import { buildImageSrc } from '~/shared/util';

import { RecipeCardBody } from './parts/body';
import { RecipeCardRoot } from './parts/root';
import { RecipeCardTitle } from './parts/title';
import { RecipeCardProps } from './props';

export const CompactRecipeCard = ({ categories, ...rootProps }: RecipeCardProps) => (
    <RecipeCardRoot asLinkBox categories={categories} {...rootProps}>
        <RecipeCardBody>
            <HStack gap={2} minW={0}>
                <Image boxSize={6} src={buildImageSrc(categories[0].icon!)} />
                <RecipeCardTitle />
            </HStack>
            <Button
                size={{ base: 'xs', lg: 'sm' }}
                flexShrink={0}
                as={Link}
                variant='outline'
                color='lime.600'
                borderColor='lime.600'
            >
                Готовить
            </Button>
        </RecipeCardBody>
    </RecipeCardRoot>
);
