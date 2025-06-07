import { Heading } from '@chakra-ui/react';

import { Main } from '~/shared/ui/main';
import { Section, SectionHeading } from '~/shared/ui/section';
import { NewRecipesSlider } from '~/widgets/new-recipes-slider';

import { FavoriteBlogs } from './favorite-blogs';
import { OtherBlogs } from './other-blogs';

export const BlogsPage = () => (
    <Main>
        <Heading
            fontSize={{ base: '2xl', lg: '5xl' }}
            lineHeight={{ base: 8, lg: 'none' }}
            mb={6}
            mx='auto'
        >
            Кулинарные блоги
        </Heading>
        <FavoriteBlogs mb={{ base: 8, lg: 10 }} />
        <OtherBlogs />
        <Section>
            <SectionHeading mb={6}>Новые рецепты</SectionHeading>
            <NewRecipesSlider />
        </Section>
    </Main>
);
