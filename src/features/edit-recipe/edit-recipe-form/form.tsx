import { Button, ButtonProps, Center, chakra, Container, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, FormProvider, useForm } from 'react-hook-form';

import { EditIcon } from '~/shared/ui/icons/edit';

import { recipeDraftSchema } from '../schema';
import { RecipeDraft } from '../types';
import { IngredientFields } from './ingredient-fields';
import { MainFields } from './main-fields';
import { StepFields } from './step-fields';
import { useLeaveBlocker } from './use-leave-blocker';
import { useSaveRecipeDraft } from './use-save-recipe-draft';

export interface EditRecipeFormProps {
    defaultValues?: DefaultValues<RecipeDraft>;
    onSubmit: (data: RecipeDraft) => void;
}

const emptyDraft: DefaultValues<RecipeDraft> = {
    title: '',
    description: '',
    image: undefined,
    time: undefined,
    portions: undefined,
    categoriesIds: [],
    ingredients: [],
    steps: [{ description: '', image: undefined, stepNumber: 1 }],
};

export const EditRecipeForm = ({ defaultValues = emptyDraft, onSubmit }: EditRecipeFormProps) => {
    const form = useForm<RecipeDraft>({
        resolver: zodResolver(recipeDraftSchema),
        defaultValues,
    });

    const saveDraft = useSaveRecipeDraft(form);

    useLeaveBlocker(form);

    return (
        <FormProvider {...form}>
            <chakra.form onSubmit={form.handleSubmit(onSubmit)}>
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
                        <SaveDraftButton onClick={saveDraft} />
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
