import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react';

export const RecipeCardsGrid = (props: SimpleGridProps) => (
    <SimpleGrid
        spacing={{ base: 3, md: 4, '2xl': 6 }}
        minChildWidth={{ base: '328px', lg: '668px' }}
        autoRows='1fr'
        {...props}
    />
);
