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
import { memo, useState } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';

import { PlusIcon } from '~/shared/ui/icons/plus';
import { TrashCanIcon } from '~/shared/ui/icons/trash-can';
import { XOR } from '~/shared/util';

import { editRecipeApi } from '../api/query';
import { IngredientSchema, RecipeDraftSchema } from '../schema';

interface RegisteredIngredientRowProps {
    isDraft?: false;
    index: number;
    onRemove?: (index: number) => void;
}

interface DraftIngredientRowProps {
    isDraft: true;
    defaultDraft?: IngredientSchema;
    onAdd?: (values: IngredientSchema) => void;
}

export type IngredientRowProps = XOR<RegisteredIngredientRowProps, DraftIngredientRowProps> &
    FlexProps;

const emptyIngredient = { count: '', measureUnit: '', title: '' };

export const IngredientRow = memo(
    ({
        index = -1,
        onRemove,
        isDraft,
        onAdd,
        defaultDraft = emptyIngredient,
        ...props
    }: IngredientRowProps) => {
        const { register, control } = useFormContext<RecipeDraftSchema>();
        const { data: measureUnits } = editRecipeApi.useMeasureUnitsQuery();
        const [draft, setDraft] = useState(defaultDraft);

        const { errors } = useFormState({
            control,
            name: [
                `ingredients.${index}.title`,
                `ingredients.${index}.count`,
                `ingredients.${index}.measureUnit`,
            ],
        });

        const updateDraft =
            (field: keyof IngredientSchema) =>
            (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
                const value = e.currentTarget.value;
                setDraft((prev) => ({ ...prev, [field]: value }));
            };

        const registerOrControlled = (field: keyof IngredientSchema) => {
            if (isDraft) {
                return { value: draft[field], onChange: updateDraft(field) };
            }
            return register(`ingredients.${index}.${field}`);
        };

        const fieldError = (field: keyof IngredientSchema) => errors.ingredients?.[index]?.[field];

        const handleAdd = () => {
            onAdd?.(draft);
            setDraft(defaultDraft);
        };

        return (
            <Flex gap={{ base: 3, '2xl': 4 }} alignItems='center' {...props} wrap='wrap'>
                <Input
                    flex={1}
                    aria-labelledby='ingredient-title-label'
                    placeholder='Ингредиент'
                    _placeholder={{ color: 'blackAlpha.700' }}
                    w={{ base: 'full', md: 'auto' }}
                    isInvalid={!!fieldError('title')}
                    {...registerOrControlled('title')}
                />
                <Input
                    type='number'
                    placeholder='100'
                    maxW='80px'
                    _placeholder={{ color: 'blackAlpha.700' }}
                    aria-labelledby='ingredient-count-label'
                    isInvalid={!!fieldError('count')}
                    {...registerOrControlled('count')}
                />
                <Select
                    w='auto'
                    flex={1}
                    maxW='215px'
                    aria-labelledby='ingredient-unit-label'
                    isInvalid={!!fieldError('measureUnit')}
                    {...registerOrControlled('measureUnit')}
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
                {isDraft ? (
                    <AddIngredientButton onClick={handleAdd} />
                ) : (
                    <RemoveIngredientButton onClick={() => onRemove?.(index)} />
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
