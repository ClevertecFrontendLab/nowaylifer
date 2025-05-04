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

export interface ToastProps extends Omit<BaseToastProps, 'position'> {
    closeButtonProps?: CloseButtonProps;
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
            addRole={false}
            status={status}
            variant={variant}
            id={ids?.root}
            alignItems='start'
            borderRadius='md'
            boxShadow='lg'
            paddingEnd={8}
            textAlign='start'
            width='auto'
            colorScheme={colorScheme}
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
                    top={1}
                    {...closeButtonProps}
                />
            )}
        </Alert>
    );
};
