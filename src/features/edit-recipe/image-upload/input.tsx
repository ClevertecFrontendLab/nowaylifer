import { FormLabel, FormLabelProps, Input, VisuallyHidden } from '@chakra-ui/react';

import { ImagePreview } from './preview';

export interface ImageFileInputProps
    extends Omit<FormLabelProps, 'value' | 'defaultValue' | 'onChange'> {
    accept?: string;
    value?: File | string;
    defaultValue?: File | string;
    onChange?: (file: File) => void;
    fallback?: React.ReactElement;
    isInvalid?: boolean;
}

export const ImageFileInput = ({
    value,
    onChange,
    defaultValue,
    fallback,
    isInvalid,
    accept = 'image/*',
    ...props
}: ImageFileInputProps) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files?.[0];
        if (newFile) onChange?.(newFile);
    };

    return (
        <FormLabel m={0} cursor='pointer' {...props}>
            <VisuallyHidden>Добавить изображение</VisuallyHidden>
            <Input type='file' display='none' accept={accept} onChange={handleFileChange} />
            <ImagePreview h='full' image={value} isInvalid={isInvalid} />
        </FormLabel>
    );
};
