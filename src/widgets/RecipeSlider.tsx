// @ts-expect-error -- foo
import 'swiper/css';

import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, IconButton, IconButtonProps } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { Recipe, RecipeCard } from '~/entities/recipe';

export const RecipeSlider = ({ recipes }: { recipes: Recipe[] }) => {
    const swiperRef = useRef<SwiperRef>(null);
    return (
        <Box pos='relative' data-test-id='carousel'>
            <Swiper
                ref={swiperRef}
                loop
                slidesPerView='auto'
                spaceBetween={12}
                breakpoints={{ 1536: { spaceBetween: 24 } }}
            >
                {recipes.map((r, i) => (
                    <SwiperSlide
                        key={r.id}
                        style={{ width: 'auto', paddingBottom: 8 }}
                        data-test-id={`carousel-card-${i}`}
                    >
                        <RecipeCard variant='vertical' recipe={r} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <SliderNavButton
                direction='prev'
                pos='absolute'
                top='35%'
                left={-2}
                onClick={() => swiperRef.current?.swiper.slidePrev()}
                data-test-id='carousel-back'
            />
            <SliderNavButton
                direction='next'
                pos='absolute'
                top='35%'
                right={-2}
                onClick={() => swiperRef.current?.swiper.slideNext()}
                data-test-id='carousel-forward'
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
