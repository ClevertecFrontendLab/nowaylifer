import { Box, BoxProps, chakra, FormLabel, Grid, Icon, IconProps } from '@chakra-ui/react';
import { useCallback } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { IngredientSchema, RecipeDraftSchema } from '../schema';
import { IngredientRow } from './ingredient-row';

const Label = chakra(FormLabel, {
    baseStyle: {
        color: 'lime.600',
        fontWeight: 'bold',
        lineHeight: 4,
        fontSize: 'xs',
        py: 1,
        m: 0,
        hideBelow: 'md',
    },
});

export const IngredientFields = (props: BoxProps) => {
    const { control } = useFormContext<RecipeDraftSchema>();
    const { fields, append, remove } = useFieldArray({ control, name: 'ingredients' });

    const handleRemove = useCallback((index: number) => remove(index), [remove]);

    const handleAdd = useCallback(
        (values: IngredientSchema) => append(values, { shouldFocus: false }),
        [append],
    );

    return (
        <Box w='full' {...props}>
            <Box
                fontWeight='semibold'
                fontSize={{ base: 'sm', lg: 'md' }}
                lineHeight={{ base: 5, lg: 6 }}
                mb={{ base: 3, md: 4 }}
            >
                Добавьте ингредиенты рецепта, нажав на
                <PlusCircleOutlineIcon display='inline-block' ml={2} boxSize={4} />
            </Box>
            <Grid
                w='full'
                hideBelow='md'
                templateColumns='1fr 80px 215px 32px'
                gap={{ base: 3, '2xl': 4 }}
                mb={4}
            >
                <Label id='ingredient-title-label' pl={4}>
                    Ингредиент
                </Label>
                <Label id='ingredient-count-label' justifySelf='center'>
                    Количество
                </Label>
                <Label id='ingredient-unit-label' pl={4}>
                    Единица измерения
                </Label>
            </Grid>
            {fields.map((field, index) => (
                <IngredientRow key={field.id} index={index} onRemove={handleRemove} mb={4} />
            ))}
            <IngredientRow isDraft onAdd={handleAdd} />
        </Box>
    );
};

const PlusCircleOutlineIcon = (props: IconProps) => (
    <Icon viewBox='0 0 16 16' boxSize='1em' {...props}>
        <path
            d='M8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16Z'
            fill='currentColor'
        />
        <path
            d='M8 4C8.13261 4 8.25979 4.05268 8.35355 4.14645C8.44732 4.24021 8.5 4.36739 8.5 4.5V7.5H11.5C11.6326 7.5 11.7598 7.55268 11.8536 7.64645C11.9473 7.74021 12 7.86739 12 8C12 8.13261 11.9473 8.25979 11.8536 8.35355C11.7598 8.44732 11.6326 8.5 11.5 8.5H8.5V11.5C8.5 11.6326 8.44732 11.7598 8.35355 11.8536C8.25979 11.9473 8.13261 12 8 12C7.86739 12 7.74021 11.9473 7.64645 11.8536C7.55268 11.7598 7.5 11.6326 7.5 11.5V8.5H4.5C4.36739 8.5 4.24021 8.44732 4.14645 8.35355C4.05268 8.25979 4 8.13261 4 8C4 7.86739 4.05268 7.74021 4.14645 7.64645C4.24021 7.55268 4.36739 7.5 4.5 7.5H7.5V4.5C7.5 4.36739 7.55268 4.24021 7.64645 4.14645C7.74021 4.05268 7.86739 4 8 4Z'
            fill='currentColor'
        />
    </Icon>
);
