import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    chakra,
    CloseButton,
    CloseButtonProps,
    ToastProps as BaseToastProps,
} from '@chakra-ui/react';

import { TestId } from '~/shared/test-ids';

export interface ToastProps extends Omit<BaseToastProps, 'position'> {
    closeButtonProps?: CloseButtonProps;
    ref?: React.Ref<HTMLDivElement>;
}

export const Toast = (props: ToastProps) => {
    const {
        status,
        variant = 'solid',
        render,
        id,
        title,
        isClosable,
        closeButtonProps,
        onClose,
        description,
        colorScheme,
        icon,
        ref,
        ...rest
    } = props;

    const ids = id
        ? {
              root: `toast-${id}`,
              title: `toast-${id}-title`,
              description: `toast-${id}-description`,
          }
        : undefined;

    return (
        <Alert
            ref={ref}
            addRole={false}
            status={status}
            variant={variant}
            id={ids?.root}
            alignItems='center'
            boxShadow='lg'
            paddingEnd={8}
            textAlign='start'
            w={{ base: '328px', lg: '400px' }}
            colorScheme={colorScheme}
            data-test-id={TestId.ERROR_ALERT}
            {...rest}
        >
            <AlertIcon>{icon}</AlertIcon>
            <chakra.div flex='1' maxWidth='100%'>
                {title && <AlertTitle id={ids?.title}>{title}</AlertTitle>}
                {description && (
                    <AlertDescription id={ids?.description} display='block'>
                        {description}
                    </AlertDescription>
                )}
            </chakra.div>
            {isClosable && (
                <CloseButton
                    size='sm'
                    onClick={onClose}
                    position='absolute'
                    insetEnd={1}
                    data-test-id={TestId.ERROR_ALERT_CLOSE}
                    top={1}
                    {...closeButtonProps}
                />
            )}
        </Alert>
    );
};
