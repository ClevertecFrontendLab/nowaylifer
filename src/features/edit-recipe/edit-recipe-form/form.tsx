import {
    Button,
    ButtonProps,
    Center,
    chakra,
    Container,
    Flex,
    FormLabel,
    Grid,
    Input,
    Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { EditIcon } from '~/shared/ui/icons/edit';

import { ImageUpload } from '../image-upload';
import { recipeDraftSchema } from '../schema';
import { RecipeDraft } from '../types';
import { IngredientFields } from './ingredient-fields';
import { NumberInputControl } from './number-input-control';
import { StepFields } from './step-fields';
import { SubCategorySelect } from './subcategory-select';

export interface EditRecipeFormProps {
    defaultValues?: DefaultValues<RecipeDraft>;
    onSubmit?: (data: RecipeDraft) => void;
}

const emptyDraft: DefaultValues<RecipeDraft> = {
    title: '',
    description: '',
    categoriesIds: [],
    ingredients: [],
    steps: [{ description: '', stepNumber: 1 }],
};

export const EditRecipeForm = ({ defaultValues = emptyDraft, onSubmit }: EditRecipeFormProps) => {
    const form = useForm<RecipeDraft>({
        resolver: zodResolver(recipeDraftSchema),
        defaultValues,
    });

    const { control, handleSubmit } = form;

    return (
        <FormProvider {...form}>
            <chakra.form onSubmit={handleSubmit((draft) => onSubmit?.(draft))}>
                <Flex gap={{ base: 4, lg: 6 }} mb={{ base: 8, lg: 10 }}>
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
                                        md: '232px',
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
                                    <FormLabel aria-invalid={invalid} m={0} fontWeight='semibold'>
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
                            <FormLabel htmlFor='portions-number-input'>
                                На сколько человек ваш рецепт?
                            </FormLabel>
                            <NumberInputControl
                                id='portions-number-input'
                                control={control}
                                name='portions'
                                min={1}
                            />
                            <FormLabel htmlFor='time-number-input'>
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
                <Container
                    p={0}
                    centerContent
                    maxW={{ base: 'none', md: '604px', lg: '658px', '2xl': '668px' }}
                    mb={{ base: 8, lg: 10 }}
                >
                    <IngredientFields mb={{ base: 8, lg: 10 }} />
                    <StepFields />
                </Container>
                <Center>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <SaveDraftButton />
                        <PublishRecipeButton />
                    </Flex>
                </Center>
            </chakra.form>
        </FormProvider>
    );
};

const PublishRecipeButton = (props: ButtonProps) => (
    <Button size='lg' variant='inverted' type='submit' {...props}>
        Опубликовать рецепт
    </Button>
);

const SaveDraftButton = (props: ButtonProps) => (
    <Button size='lg' variant='outline' leftIcon={<EditIcon />} {...props}>
        Сохранить черновик
    </Button>
);
