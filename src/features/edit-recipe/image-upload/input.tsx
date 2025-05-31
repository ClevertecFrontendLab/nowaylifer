import { FormLabel, FormLabelProps, Input, VisuallyHidden } from '@chakra-ui/react';

import { ImagePreview } from './preview';

interface ImageFileInputTestId {
    input: string;
    imagePreview: string;
    imageContainer: string;
}

export interface ImageFileInputProps
    extends Omit<FormLabelProps, 'value' | 'defaultValue' | 'onChange'> {
    accept?: string;
    value?: File | string;
    defaultValue?: File | string;
    onChange?: (file: File) => void;
    fallback?: React.ReactElement;
    isInvalid?: boolean;
    testId?: Partial<ImageFileInputTestId>;
}

export const ImageFileInput = ({
    value,
    onChange,
    defaultValue,
    fallback,
    isInvalid,
    accept = 'image/*',
    testId,
    ...props
}: ImageFileInputProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) onChange?.(newFile);
    };

    return (
        <FormLabel m={0} cursor='pointer' {...props}>
            <VisuallyHidden>Добавить изображение</VisuallyHidden>
            <Input
                data-test-id={testId?.input}
                type='file'
                display='none'
                accept={accept}
                onChange={handleFileChange}
            />
            <ImagePreview
                h='full'
                image={value}
                isInvalid={isInvalid}
                data-test-id={testId?.imageContainer}
                imageProps={{ 'data-test-id': testId?.imagePreview }}
            />
        </FormLabel>
    );
};
