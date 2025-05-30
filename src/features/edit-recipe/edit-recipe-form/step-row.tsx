import {
    Badge,
    Card,
    CardBody,
    Flex,
    IconButton,
    IconButtonProps,
    Textarea,
} from '@chakra-ui/react';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { TrashCanIcon } from '~/shared/ui/icons/trash-can';

import { ImageUpload } from '../image-upload';
import { RecipeDraftSchema } from '../schema';

export interface StepRowProps {
    index: number;
    isRemovable?: boolean;
    onRemove?: (index: number) => void;
}

export const StepRow = memo(({ index, isRemovable, onRemove }: StepRowProps) => {
    const { control } = useFormContext<RecipeDraftSchema>();
    return (
        <Card direction={{ base: 'column', sm: 'row' }}>
            <Controller
                control={control}
                name={`steps.${index}.image`}
                render={({ field }) => (
                    <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        previewProps={{
                            h: '160px',
                            w: 'full',
                            border: 'none',
                            flex: { base: 'auto', sm: 1, md: 'auto' },
                            maxW: { base: 'none', sm: '346px' },
                        }}
                    />
                )}
            />
            <CardBody p={5}>
                <Flex justify='space-between' align='center' mb={4} height={6}>
                    <Badge h={6} px={2} bg='blackAlpha.100'>
                        Шаг {index + 1}
                    </Badge>
                    {isRemovable && <RemoveStepButton onClick={() => onRemove?.(index)} />}
                </Flex>
                <Controller
                    control={control}
                    name={`steps.${index}.description`}
                    render={({ field, fieldState: { invalid } }) => (
                        <Textarea
                            placeholder='Шаг'
                            _placeholder={{ color: 'blackAlpha.700' }}
                            isInvalid={invalid}
                            {...field}
                        />
                    )}
                />
            </CardBody>
        </Card>
    );
});

const RemoveStepButton = (props: Omit<IconButtonProps, 'aria-label'>) => (
    <IconButton
        size='sm'
        variant='ghost'
        icon={<TrashCanIcon color='lime.600' />}
        aria-label='Удалить шаг'
        {...props}
    />
);
