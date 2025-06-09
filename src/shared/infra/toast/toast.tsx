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

export interface ToastTestId {
    root: string;
    title: string;
    description: string;
    closeButton: string;
}

export interface ToastProps extends Omit<BaseToastProps, 'position'> {
    closeButtonProps?: CloseButtonProps;
    ref?: React.Ref<HTMLDivElement>;
    testId?: Partial<ToastTestId>;
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
        testId,
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
            data-test-id={testId?.root}
            {...rest}
        >
            <AlertIcon>{icon}</AlertIcon>
            <chakra.div flex='1' maxWidth='100%'>
                {title && (
                    <AlertTitle id={ids?.title} data-test-id={testId?.title}>
                        {title}
                    </AlertTitle>
                )}
                {description && (
                    <AlertDescription
                        id={ids?.description}
                        data-test-id={testId?.description}
                        display='block'
                    >
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
                    data-test-id={testId?.closeButton}
                    top={1}
                    {...closeButtonProps}
                />
            )}
        </Alert>
    );
};
