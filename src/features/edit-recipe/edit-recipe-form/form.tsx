import {
    Button,
    ButtonProps,
    Center,
    chakra,
    Container,
    Flex,
    FormLabel,
    Grid,
    Icon,
    IconProps,
    Input,
    Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, DefaultValues, FormProvider, useForm } from 'react-hook-form';

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
    <Button size='lg' variant='outline' leftIcon={<PenIcon />} {...props}>
        Сохранить черновик
    </Button>
);

const PenIcon = (props: IconProps) => (
    <Icon viewBox='0 0 17 16' boxSize='1em' {...props}>
        <path
            d='M13.1967 4.93392C13.4487 4.68192 13.5874 4.34725 13.5874 3.99125C13.5874 3.63525 13.4487 3.30059 13.1967 3.04859L12.1394 1.99125C11.8874 1.73925 11.5527 1.60059 11.1967 1.60059C10.8407 1.60059 10.5061 1.73925 10.2547 1.99059L3.16675 9.05659V11.9999H6.10875L13.1967 4.93392ZM11.1967 2.93392L12.2547 3.99059L11.1947 5.04659L10.1374 3.98992L11.1967 2.93392ZM4.50008 10.6666V9.60992L9.19341 4.93125L10.2507 5.98859L5.55808 10.6666H4.50008ZM3.16675 13.3333H13.8334V14.6666H3.16675V13.3333Z'
            fill='currentColor'
        />
    </Icon>
);
