import { Button, ButtonProps, Center, chakra, Container, cssVar, Flex } from '@chakra-ui/react';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { Recipe } from '~/entities/recipe';
import { isQueryHttpError } from '~/shared/api/util';
import { TestId } from '~/shared/test-ids';
import { EditIcon } from '~/shared/ui/icons/edit';
import { HttpStatusCode } from '~/shared/util';

import { RecipeDraft } from '../types';
import { formResolver } from './form-resolver';
import { IngredientFields } from './ingredient-fields';
import { MainFields } from './main-fields';
import { StepFields } from './step-fields';
import { useConfirmLeave } from './use-confirm-leave';
import { useRecipeMutation } from './use-recipe-mutation';
import { useSaveRecipeDraft } from './use-save-recipe-draft';

export type EditRecipeFormProps = { onSuccess: (recipe: Recipe) => void } & (
    | { mode: 'create'; defaultValues?: DefaultValues<RecipeDraft>; recipeId?: undefined }
    | { mode: 'update'; defaultValues: DefaultValues<RecipeDraft>; recipeId: string }
);

const emptyIngredient = { title: '', count: '', measureUnit: '' };
const emptyStep = { description: '', image: null, stepNumber: 1 };

const emptyDraft: DefaultValues<RecipeDraft> = {
    title: '',
    description: '',
    image: undefined,
    time: undefined,
    portions: undefined,
    categoriesIds: [],
    ingredients: [emptyIngredient],
    steps: [emptyStep],
};

const $inputColor = cssVar('inputColor');

export const EditRecipeForm = ({
    mode,
    defaultValues,
    onSuccess,
    recipeId,
}: EditRecipeFormProps) => {
    defaultValues = defaultValues
        ? { ...defaultValues, ingredients: [...(defaultValues.ingredients ?? []), emptyIngredient] }
        : emptyDraft;

    const form = useForm<RecipeDraft>({
        resolver: formResolver,
        shouldFocusError: false,
        defaultValues,
    });

    const { unblockNavigation } = useConfirmLeave({
        blockLeave: form.formState.isDirty,
        onSave: async ({ closeModal, blocker }) => {
            const { success, error } = await saveDraft();

            if (success || error === 'formInvalid') {
                closeModal();
            }

            if (success && blocker.state === 'blocked') {
                blocker.proceed();
            }
        },
    });

    const saveDraft = useSaveRecipeDraft(form, unblockNavigation);
    const mutateRecipe = useRecipeMutation(mode);

    const handleFormValid = async (data: RecipeDraft) => {
        const result = await mutateRecipe(data, recipeId);

        const { error } = result;

        if (!error) {
            unblockNavigation();
            return onSuccess(result.data);
        }

        if (isQueryHttpError(error) && error.status === HttpStatusCode.CONFLICT) {
            form.setError('title', {});
        }
    };

    return (
        <FormProvider {...form}>
            <chakra.form
                onSubmit={form.handleSubmit(handleFormValid)}
                data-test-id={TestId.RECIPE_FORM}
                sx={{
                    [$inputColor.variable]: 'blackAlpha.900',
                    '& input.chakra-input': { color: $inputColor.reference },
                }}
            >
                <MainFields />
                <Container
                    p={0}
                    centerContent
                    mb={{ base: 8, lg: 10 }}
                    maxW={{ base: 'none', sm: '604px', lg: '658px', '2xl': '668px' }}
                >
                    <IngredientFields mb={{ base: 8, lg: 10 }} />
                    <StepFields />
                </Container>
                <Center>
                    <Flex gap={5} direction={{ base: 'column', md: 'row' }}>
                        <SaveDraftButton onClick={saveDraft} />
                        <PublishRecipeButton />
                    </Flex>
                </Center>
            </chakra.form>
        </FormProvider>
    );
};

const PublishRecipeButton = (props: ButtonProps) => (
    <Button
        size='lg'
        type='submit'
        variant='inverted'
        data-test-id={TestId.PUBLISH_BUTTON}
        {...props}
    >
        Опубликовать рецепт
    </Button>
);

const SaveDraftButton = (props: ButtonProps) => (
    <Button
        size='lg'
        variant='outline'
        leftIcon={<EditIcon />}
        {...props}
        data-test-id={TestId.SAVE_DRAFT_BUTTON}
    >
        Сохранить черновик
    </Button>
);
