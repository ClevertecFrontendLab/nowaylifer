// @ts-expect-error -- foo
import 'swiper/css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, IconButton, IconButtonProps } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { selectCategoriesInvariant } from '~/entities/category/selectors';
import { RecipeCard } from '~/entities/recipe';
import { recipeApi } from '~/entities/recipe/api';
import { buildRecipePath, getRecipeRootCategories } from '~/entities/recipe/util';
import { useAppSelector } from '~/shared/store';
import { TestId } from '~/shared/test-ids';
import { isE2E } from '~/shared/util';

import { useShowAppLoader } from './app-loader';

export const NewRecipesSlider = () => {
    const { data: recipes, isLoading } = recipeApi.useRecipesQuery({
        sortBy: 'createdAt',
        sortOrder: 'desc',
        limit: 10,
    });
    const { categoryById } = useAppSelector(selectCategoriesInvariant);
    const swiperRef = useRef<SwiperRef>(null);

    useShowAppLoader(isLoading);

    return (
        <Box pos='relative' data-test-id={TestId.CAROUSEL}>
            <Swiper
                ref={swiperRef}
                loop
                slidesPerView='auto'
                spaceBetween={12}
                breakpoints={{ 1536: { spaceBetween: 24 } }}
                speed={isE2E() ? 0 : undefined}
            >
                {recipes?.map((r, idx) => (
                    <SwiperSlide
                        key={r._id}
                        style={{ width: 'auto', paddingBottom: 8 }}
                        data-test-id={TestId.carouselCard(idx)}
                    >
                        <RecipeCard
                            variant='vertical'
                            recipe={r}
                            categories={getRecipeRootCategories(r, categoryById)}
                            recipeLink={buildRecipePath(r, categoryById)}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderNavButton
                direction='prev'
                pos='absolute'
                top='35%'
                left={-2}
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                data-test-id={TestId.CAROUSEL_BACK}
            />
            <SliderNavButton
                direction='next'
                pos='absolute'
                top='35%'
                right={-2}
                onClick={() => swiperRef.current?.swiper.slideNext()}
                data-test-id={TestId.CAROUSEL_FORWARD}
            />
        </Box>
    );
};

interface SliderNavButtonProps extends Omit<IconButtonProps, 'aria-label'> {
    ref?: React.Ref<HTMLButtonElement>;
    direction: 'prev' | 'next';
}

const SliderNavButton = ({ direction, ...rest }: SliderNavButtonProps) => {
    const Icon = direction === 'next' ? ArrowForwardIcon : ArrowBackIcon;
    return (
        <IconButton
            size='lg'
            bg='black'
            color='lime.50'
            zIndex={1}
            hideBelow='lg'
            transition='none'
            aria-label={`Slide ${direction === 'next' ? 'next' : 'previous'}`}
            icon={<Icon boxSize={6} />}
            {...rest}
        />
    );
};
