import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ZodError } from 'zod';

import { fileApi } from '~/shared/api';
import { useAppLoader } from '~/shared/infra/app-loader';
import { useToast } from '~/shared/infra/toast';

import { errorMeta } from '../api/error-meta';
import { imageFileSchema } from '../schema';
import { ImageUploadDialog, ImageUploadDialogProps } from './dialog';
import { ImagePreview, ImagePreviewProps } from './preview';

interface ImageUploadTestId {
    imageContainer: string;
    imagePreivew: string;
    input: string;
    dialog: string;
    dialogImageContainer: string;
    dialogImagePreview: string;
}

export interface ImageUploadProps {
    value?: string;
    onChange?: (image: string | undefined) => void;
    isInvalid?: boolean;
    previewProps?: ImagePreviewProps;
    modalProps?: Omit<ImageUploadDialogProps, 'isOpen' | 'onClose'>;
    testId?: Partial<ImageUploadTestId>;
}

export const ImageUpload = ({
    value,
    testId,
    isInvalid,
    onChange,
    previewProps,
    modalProps,
}: ImageUploadProps) => {
    const [localImage, setImage] = useState<File | string | undefined>(value);
    const [savedImage, setSavedImage] = useState<File | string | undefined>(localImage);
    const [uploadFile, { isLoading }] = fileApi.useUploadFileMutation();
    const [imageError, setImageError] = useState<ZodError<File>>();
    const [hasBeenOpened, setHasBeenOpened] = useState(false);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { toast } = useToast();

    useAppLoader(isLoading);

    useEffect(() => {
        if (imageError && !toast.isActive('imageError')) {
            toast({ id: 'imageError', status: 'error', title: imageError.issues[0].message });
        }
    }, [imageError, toast]);

    const handleImageChange = (imageFile: File) => {
        const { success, error } = imageFileSchema.safeParse(imageFile);
        if (success) {
            setImage(imageFile);
            setImageError(undefined);
        } else {
            setImage(undefined);
            setImageError(error);
        }
    };

    const hanldeImageSave = async () => {
        if (localImage instanceof File) {
            const res = await uploadFile({
                file: localImage,
                errorMetaByStatus: errorMeta.uploadImage,
            });

            if (res.error) return;

            setSavedImage(localImage);
            onChange?.(res.data.url);
        } else {
            setSavedImage(localImage);
            onChange?.(localImage);
        }

        onClose();
    };

    const handleImageDelete = () => {
        setImage(undefined);
        setSavedImage(undefined);
        onClose();
    };

    const openModal = () => {
        setHasBeenOpened(true);
        onOpen();
    };

    return (
        <>
            <ImagePreview
                cursor='pointer'
                image={savedImage}
                onClick={openModal}
                isInvalid={isInvalid}
                data-test-id={testId?.imageContainer}
                imageProps={{ 'data-test-id': testId?.imagePreivew }}
                {...previewProps}
            />
            {hasBeenOpened && (
                <ImageUploadDialog
                    image={localImage}
                    isOpen={isOpen}
                    onClose={onClose}
                    savedImage={savedImage}
                    isInvalid={!!imageError}
                    onImageSave={hanldeImageSave}
                    onImageChange={handleImageChange}
                    onImageDelete={handleImageDelete}
                    onCloseComplete={() => {
                        setImage(savedImage);
                        setImageError(undefined);
                    }}
                    testId={{
                        input: testId?.input,
                        dialog: testId?.dialog,
                        imageContainer: testId?.dialogImageContainer,
                        imagePreview: testId?.dialogImagePreview,
                    }}
                    {...modalProps}
                />
            )}
        </>
    );
};
