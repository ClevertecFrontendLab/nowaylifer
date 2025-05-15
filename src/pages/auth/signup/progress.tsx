import { Progress, ProgressProps } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import { SignUpSchema, signUpSchema, signUpSchemaKeys } from './schema';

export const FormProgress = (props: ProgressProps) => {
    const count = useValidFieldsCount();
    return (
        <Progress
            mb={6}
            h={2}
            hasStripe
            value={calcProgress(signUpSchemaKeys.length, count)}
            {...props}
        />
    );
};

const calcProgress = (totalFields: number, validFields: number) =>
    (100 / totalFields) * validFields;

const useValidFieldsCount = () => {
    const { watch } = useFormContext<SignUpSchema>();
    const values = watch();
    const errors = signUpSchema.safeParse(values).error?.flatten().fieldErrors ?? {};
    return signUpSchemaKeys.reduce((count, key) => (errors[key] ? count : count + 1), 0);
};
