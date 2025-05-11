import { Progress } from '@chakra-ui/react';
import { FieldValues, Path, useFormContext } from 'react-hook-form';

import { signUpSchemaKeys } from './schema';

export const FormProgress = () => {
    const count = useValidFieldsCount(signUpSchemaKeys);
    return <Progress mb={6} h={2} hasStripe value={calcProgress(signUpSchemaKeys.length, count)} />;
};

const calcProgress = (totalFields: number, validFields: number) =>
    (100 / totalFields) * validFields;

// updates value only on submit
const useValidFieldsCount = <T extends FieldValues>(fieldKeys: Path<T>[]) => {
    const {
        formState: { submitCount: _ },
        getFieldState,
    } = useFormContext<T>();

    return fieldKeys.reduce((count, key) => {
        const { invalid, isDirty } = getFieldState(key);
        return isDirty && !invalid ? count + 1 : count;
    }, 0);
};
