import { Box, Button, Center, Modal, ModalOverlay, ModalProps } from '@chakra-ui/react';

import {
    AppModalBody,
    AppModalCloseButton,
    AppModalContent,
    AppModalTitle,
} from '~/shared/infra/modals-manager';

import { ImageFileInput, ImageFileInputProps } from './input';

export interface ImageUploadDialogProps extends Omit<ModalProps, 'children'> {
    isInvalid?: boolean;
    image?: File | string;
    savedImage?: File | string;
    onImageChange?: ImageFileInputProps['onChange'];
    onImageSave?: () => void;
    onImageDelete?: () => void;
}

export const ImageUploadDialog = ({
    isInvalid,
    image,
    savedImage,
    onImageChange,
    onImageDelete,
    onImageSave,
    ...props
}: ImageUploadDialogProps) => (
    <Modal isCentered {...props}>
        <ModalOverlay />
        <AppModalContent>
            <AppModalCloseButton />
            <AppModalBody pb={image ? 8 : 10}>
                <AppModalTitle mb={8}>Изображение</AppModalTitle>
                <Center>
                    <ImageFileInput
                        value={image}
                        isInvalid={isInvalid}
                        boxSize={{ base: '108px', lg: '206px' }}
                        onChange={onImageChange}
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
