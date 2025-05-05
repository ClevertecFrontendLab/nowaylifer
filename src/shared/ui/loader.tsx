import { BoxProps, ResponsiveValue, Spinner, Square, useMultiStyleConfig } from '@chakra-ui/react';

export interface LoaderProps extends BoxProps {
    size?: ResponsiveValue<'sm' | 'md'>;
}

export const Loader = ({ size, ...props }: LoaderProps) => {
    const styles = useMultiStyleConfig('Loader', { size });
    return (
        <Square sx={styles.container} {...props}>
            <Spinner sx={styles.spinner} />
        </Square>
    );
};
