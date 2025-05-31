import {
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputProps,
    NumberInputStepper,
} from '@chakra-ui/react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

export interface NumberInputControlProps<TFieldValues extends FieldValues>
    extends Omit<ControllerProps<TFieldValues>, 'render'>,
        Omit<NumberInputProps, 'children' | 'defaultValue' | 'name'> {
    label?: string;
    testId?: { contianer?: string; input?: string };
}

export const NumberInputControl = <TFieldValues extends FieldValues>({
    label,
    name,
    control,
    defaultValue,
    disabled,
    rules,
    shouldUnregister,
    testId,
    ...props
}: NumberInputControlProps<TFieldValues>) => (
    <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled}
        rules={rules}
        shouldUnregister={shouldUnregister}
        render={({ field: { onChange, onBlur, value, ref }, fieldState: { invalid } }) => (
            <FormControl
                display='flex'
                alignItems='center'
                gap={{ base: 4, lg: 6 }}
                isInvalid={invalid}
            >
                {label && <FormLabel>{label}</FormLabel>}
                <NumberInput
                    w='90px'
                    value={value}
                    onBlur={onBlur}
                    onChange={(_, value) => onChange(isNaN(value) ? undefined : value)}
                    data-test-id={testId?.contianer}
                    {...props}
                >
                    <NumberInputField ref={ref} data-test-id={testId?.input} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </FormControl>
        )}
    />
);
