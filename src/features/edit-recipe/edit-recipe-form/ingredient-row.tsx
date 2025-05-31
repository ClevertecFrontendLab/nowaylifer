import {
    chakra,
    Circle,
    Flex,
    FlexProps,
    IconButton,
    IconButtonProps,
    Input,
    Select,
} from '@chakra-ui/react';
import { memo } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

import { TestId } from '~/shared/test-ids';
import { PlusIcon } from '~/shared/ui/icons/plus';
import { TrashCanIcon } from '~/shared/ui/icons/trash-can';

import { editRecipeApi } from '../api/query';
import { IngredientSchema, RecipeDraftSchema } from '../schema';

export interface IngredientRowProps extends FlexProps {
    index: number;
    isLast?: boolean;
    onAdd?: () => void;
    onRemove?: (index: number) => void;
}

export const IngredientRow = memo(
    ({ index, isLast, onRemove, onAdd, ...props }: IngredientRowProps) => {
        const { register, control } = useFormContext<RecipeDraftSchema>();
        const { data: measureUnits } = editRecipeApi.useMeasureUnitsQuery();

        const { errors } = useFormState({
            control,
            name: [
                `ingredients.${index}.title`,
                `ingredients.${index}.count`,
                `ingredients.${index}.measureUnit`,
            ],
        });

        const fieldError = (field: keyof IngredientSchema) => errors.ingredients?.[index]?.[field];

        return (
            <Flex gap={{ base: 3, '2xl': 4 }} align='center' wrap='wrap' {...props}>
                <Input
                    flex={{ base: 'auto', '2sm': 1 }}
                    w={{ base: 'full', '2sm': 'auto' }}
                    aria-labelledby='ingredient-title-label'
                    placeholder='Ингредиент'
                    _placeholder={{ color: 'blackAlpha.700' }}
                    isInvalid={!!fieldError('title')}
                    data-test-id={TestId.ingredientTitle(index)}
                    {...register(`ingredients.${index}.title`)}
                />
                <Input
                    type='number'
                    placeholder='100'
                    maxW='80px'
                    _placeholder={{ color: 'blackAlpha.700' }}
                    aria-labelledby='ingredient-count-label'
                    isInvalid={!!fieldError('count')}
                    data-test-id={TestId.ingredientCount(index)}
                    {...register(`ingredients.${index}.count`, {
                        setValueAs: (value) => (value === '' ? '' : Number(value)),
                    })}
                />
                <Select
                    w='auto'
                    flex={1}
                    maxW='215px'
                    aria-labelledby='ingredient-unit-label'
                    isInvalid={!!fieldError('measureUnit')}
                    data-test-id={TestId.ingredientUnit(index)}
                    {...register(`ingredients.${index}.measureUnit`)}
                >
                    <>
                        <chakra.option hidden disabled value=''>
                            Единица измерения
                        </chakra.option>
                        {measureUnits?.map((unit) => (
                            <chakra.option key={unit._id} value={unit.name}>
                                {unit.name}
                            </chakra.option>
                        ))}
                    </>
                </Select>
                {isLast ? (
                    <AddIngredientButton
                        onClick={onAdd}
                        data-test-id={TestId.INGREDIENT_ADD_BUTTON}
                    />
                ) : (
                    <RemoveIngredientButton
                        onClick={() => onRemove?.(index)}
                        data-test-id={TestId.ingredientRemove(index)}
                    />
                )}
            </Flex>
        );
    },
);

const RemoveIngredientButton = (props: Omit<IconButtonProps, 'aria-label'>) => (
    <IconButton
        size='sm'
        variant='ghost'
        icon={<TrashCanIcon color='lime.600' />}
        aria-label='Удалить ингредиент'
        {...props}
    />
);

const AddIngredientButton = (props: Omit<IconButtonProps, 'aria-label'>) => (
    <IconButton
        size='sm'
        variant='unstyled'
        aria-label='Добавить ингредиент'
        icon={
            <Circle bg='black' size='full'>
                <PlusIcon color='lime.50' />
            </Circle>
        }
        {...props}
    />
);
