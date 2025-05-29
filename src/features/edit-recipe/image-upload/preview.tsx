import { BoxProps, Center, Flex, Image, ImageProps, useTheme } from '@chakra-ui/react';
import { getColor } from '@chakra-ui/theme-tools';
import { isString } from 'lodash-es';
import { useEffect, useState } from 'react';

import { ImageIcon } from '~/shared/ui/icons/image';

const PreviewFallback = () => (
    <Center bg='blackAlpha.200' boxSize='full'>
        <ImageIcon boxSize={8} />
    </Center>
);

const defaultFallback = <PreviewFallback />;

export interface ImagePreviewProps extends BoxProps {
    image?: File | string;
    isInvalid?: boolean;
    imageProps?: ImageProps;
    errorBorderColor?: string;
    fallback?: React.ReactElement;
}

export const ImagePreview = ({
    image,
    imageProps,
    fallback = defaultFallback,
    errorBorderColor = 'red.500',
    isInvalid,
    ...props
}: ImagePreviewProps) => {
    const previewUrl = useImagePreview(image);
    const theme = useTheme<ChakraTheme>();

    return (
        <Flex
            direction='column'
            borderRadius='lg'
            overflow='hidden'
            aria-invalid={isInvalid}
            border='1px'
            borderColor='transparent'
            _invalid={{
                borderColor: getColor(theme, errorBorderColor),
                boxShadow: `0 0 0 1px ${getColor(theme, errorBorderColor)}`,
            }}
            {...props}
        >
            {previewUrl ? (
                <Image
                    src={previewUrl}
                    fallback={fallback}
                    alt='Preview'
                    boxSize='full'
                    objectFit='cover'
                    {...imageProps}
                />
            ) : (
                fallback
            )}
        </Flex>
    );
};

const useImagePreview = (image?: File | string) => {
    const [previewUrl, setPreviewUrl] = useState<string | undefined>(() =>
        isString(image) ? image : undefined,
    );

    useEffect(() => {
        if (!image) {
            setPreviewUrl(undefined);
            return;
        }

        if (isString(image)) {
            setPreviewUrl(image);
            return;
        }

        const url = URL.createObjectURL(image);
        setPreviewUrl(url);

        return () => {
            setPreviewUrl(undefined);
            URL.revokeObjectURL(url);
        };
    }, [image]);

    return previewUrl;
};
