import { Button, ButtonProps, Center, chakra, Container, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { useAppLoader } from '~/shared/infra/app-loader';
import { RoutePath } from '~/shared/router';
import { EditIcon } from '~/shared/ui/icons/edit';

import { editRecipeApi } from '../api/query';
import { recipeDraftSchema } from '../schema';
import { EditRecipeHistoryState, RecipeDraft } from '../types';
import { IngredientFields } from './ingredient-fields';
import { MainFields } from './main-fields';
import { StepFields } from './step-fields';

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
    const navigate = useNavigate();
    const form = useForm<RecipeDraft>({
        resolver: zodResolver(recipeDraftSchema),
        defaultValues,
    });

    const { handleSubmit, trigger: triggerValidate } = form;

    const [saveDraft, { isLoading }] = editRecipeApi.useSaveDraftMutation();
    useAppLoader(isLoading);

    const handleSaveDraft = async () => {
        const isTitleValid = await triggerValidate('title', { shouldFocus: true });
        if (!isTitleValid) return;

        const res = await saveDraft(form.getValues());
        if (res.error) return;

        navigate(RoutePath.Main, {
            state: { editRecipe: { event: 'draftSaved' } } satisfies EditRecipeHistoryState,
        });
    };

    return (
        <FormProvider {...form}>
            <chakra.form onSubmit={handleSubmit((draft) => onSubmit?.(draft))}>
                <MainFields />
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
                        <SaveDraftButton onClick={handleSaveDraft} />
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
