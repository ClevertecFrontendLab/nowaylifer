import { Flex, FormLabel, Grid, Input, Textarea } from '@chakra-ui/react';
import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ImageUpload } from '../image-upload';
import { RecipeDraft } from '../types';
import { NumberInputControl } from './number-input-control';
import { SubCategorySelect } from './subcategory-select';

export const MainFields = memo(() => {
    const { control } = useFormContext<RecipeDraft>();

    return (
        <Flex
            gap={{ base: 4, lg: 6 }}
            mb={{ base: 8, lg: 10 }}
            direction={{ base: 'column', '2sm': 'row' }}
        >
            <Controller
                name='image'
                control={control}
                render={({ field, fieldState: { invalid } }) => (
                    <ImageUpload
                        value={field.value}
                        isInvalid={invalid}
                        onChange={field.onChange}
                        previewProps={{
                            w: 'full',
                            h: { base: '224px', lg: '410px' },
                            maxW: {
                                base: 'none',
                                '2sm': '232px',
                                lg: '353px',
                                '2xl': '553px',
                            },
                        }}
                    />
                )}
            />
            <Flex direction='column' w='full' maxW='668px'>
                <Controller
                    control={control}
                    name='categoriesIds'
                    render={({ field, fieldState: { invalid } }) => (
                        <Flex
                            align='center'
                            justify='space-between'
                            gap={{ base: 4, lg: 6 }}
                            mb={{ base: 4, lg: 8 }}
                        >
                            <FormLabel
                                flexShrink={{ base: 1, md: 0 }}
                                aria-invalid={invalid}
                                fontWeight='semibold'
                            >
                                Выберите не менее 3-х тегов
                            </FormLabel>
                            <SubCategorySelect
                                isInvalid={invalid}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </Flex>
                    )}
                />
                <Controller
                    control={control}
                    name='title'
                    render={({ field, fieldState: { invalid } }) => (
                        <Input
                            isInvalid={invalid}
                            _placeholder={{ color: 'blackAlpha.700' }}
                            size='lg'
                            placeholder='Название рецепта'
                            mb={{ base: 4, lg: 6 }}
                            {...field}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name='description'
                    render={({ field, fieldState: { invalid } }) => (
                        <Textarea
                            isInvalid={invalid}
                            mb={{ base: 4, lg: 6 }}
                            _placeholder={{ color: 'blackAlpha.700' }}
                            placeholder='Краткое описание рецепта'
                            {...field}
                        />
                    )}
                />
                <Grid
                    alignSelf='start'
                    templateColumns='auto auto'
                    alignItems='center'
                    gap={{ base: 4, lg: 6 }}
                >
                    <FormLabel htmlFor='portions-number-input' fontWeight='semibold'>
                        На сколько человек ваш рецепт?
                    </FormLabel>
                    <NumberInputControl
                        id='portions-number-input'
                        control={control}
                        name='portions'
                        min={1}
                    />
                    <FormLabel htmlFor='time-number-input' fontWeight='semibold'>
                        Сколько времени готовить в минутах?
                    </FormLabel>
                    <NumberInputControl
                        id='time-number-input'
                        control={control}
                        name='time'
                        min={1}
                        max={10000}
                    />
                </Grid>
            </Flex>
        </Flex>
    );
});
