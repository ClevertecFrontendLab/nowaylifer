import { Box, BoxProps, Button, ButtonProps, Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { PlusCircleIcon } from '~/shared/ui/icons/plus-circle';

import { RecipeDraftSchema } from '../schema';
import { StepRow } from './step-row';

export const StepFields = (props: BoxProps) => {
    const needsRenumberRef = useRef(false);
    const { control, setValue } = useFormContext<RecipeDraftSchema>();
    const { fields, append, remove } = useFieldArray({ control, name: 'steps' });

    useEffect(() => {
        if (needsRenumberRef.current) {
            needsRenumberRef.current = false;
            fields.forEach((_, index) => {
                setValue(`steps.${index}.stepNumber`, index + 1, { shouldDirty: false });
            });
        }
    }, [fields, setValue]);

    const handleRemove = useCallback(
        (index: number) => {
            needsRenumberRef.current = true;
            remove(index);
        },
        [remove],
    );

    const handleAdd = () =>
        append(
            { description: '', image: undefined, stepNumber: fields.length + 1 },
            { shouldFocus: false },
        );

    return (
        <Flex w='full' direction='column' gap={4} {...props}>
            <Box
                fontWeight='semibold'
                fontSize={{ base: 'sm', lg: 'md' }}
                lineHeight={{ base: 5, lg: 6 }}
            >
                Добавьте шаги приготовления
            </Box>
            {fields.map((field, index) => (
                <StepRow
                    key={field.id}
                    index={index}
                    isRemovable={fields.length > 1}
                    onRemove={handleRemove}
                />
            ))}
            <AddStepButton alignSelf='end' onClick={handleAdd} />
        </Flex>
    );
};

const AddStepButton = (props: ButtonProps) => (
    <Button size='sm' variant='outline' rightIcon={<PlusCircleIcon />} {...props}>
        Новый шаг
    </Button>
);
