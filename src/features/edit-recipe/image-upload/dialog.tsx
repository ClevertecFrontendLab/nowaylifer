import { Box, Button, Center, Modal, ModalOverlay, ModalProps } from '@chakra-ui/react';

import {
    AppModalBody,
    AppModalCloseButton,
    AppModalContent,
    AppModalTitle,
} from '~/shared/infra/modals-manager';
import { TestId } from '~/shared/test-ids';

import { ImageFileInput, ImageFileInputProps } from './input';

interface ImageUploadDialogTestId {
    dialog: string;
    input: string;
    imageContainer: string;
    imagePreview: string;
}

export interface ImageUploadDialogProps extends Omit<ModalProps, 'children'> {
    isInvalid?: boolean;
    image?: File | string | null;
    savedImage?: File | string | null;
    onImageChange?: ImageFileInputProps['onChange'];
    onImageSave?: () => void;
    onImageDelete?: () => void;
    testId?: Partial<ImageUploadDialogTestId>;
}

export const ImageUploadDialog = ({
    isInvalid,
    image,
    savedImage,
    onImageChange,
    onImageDelete,
    onImageSave,
    testId,
    ...props
}: ImageUploadDialogProps) => (
    <Modal isCentered {...props}>
        <ModalOverlay />
        <AppModalContent data-test-id={testId?.dialog}>
            <AppModalCloseButton data-test-id={TestId.MODAL_CLOSE_BUTTON} />
            <AppModalBody pb={image ? 8 : 10}>
                <AppModalTitle mb={8}>Изображение</AppModalTitle>
                <Center>
                    <ImageFileInput
                        value={image}
                        isInvalid={isInvalid}
                        boxSize={{ base: '108px', lg: '206px' }}
                        onChange={onImageChange}
                        testId={testId}
                    />
                </Center>
                {(image || savedImage) && (
                    <Box>
                        <Button
                            w='full'
                            size='lg'
                            mt={8}
                            mb={4}
                            variant='inverted'
                            onClick={onImageSave}
                        >
                            Сохранить
                        </Button>
                        <Button size='lg' w='full' variant='ghost' onClick={onImageDelete}>
                            Удалить
                        </Button>
                    </Box>
                )}
            </AppModalBody>
        </AppModalContent>
    </Modal>
);
