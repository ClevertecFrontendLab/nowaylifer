import { BoxProps, ResponsiveValue, Spinner, Square, useMultiStyleConfig } from '@chakra-ui/react';
import { cx } from '@chakra-ui/utils';

export interface LoaderProps extends BoxProps {
    size?: ResponsiveValue<'sm' | 'md'>;
}

export const Loader = ({ size, className, ...props }: LoaderProps) => {
    const styles = useMultiStyleConfig('Loader', { size });
    return (
        <Square sx={styles.container} className={cx('glow-circle', className)} {...props}>
            <Spinner sx={styles.spinner} />
        </Square>
    );
};
