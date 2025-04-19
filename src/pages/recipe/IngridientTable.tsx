import {
    BoxProps,
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

export interface IngridientTableProps extends BoxProps {
    defaultPortions?: number;
    ingridients: { title: string; count: number; measureUnit: string }[];
}

export const IngridientTable = ({
    defaultPortions = 1,
    ingridients,
    ...rest
}: IngridientTableProps) => {
    const [portions, setPortions] = useState(defaultPortions);
    return (
        <TableContainer {...rest}>
            <Table
                variant='striped'
                colorScheme='blackAlpha'
                sx={{
                    '& :is(th, td)': { borderWidth: '0 !important' },
                    '& th': {
                        color: 'lime.600',
                        py: 2,
                        px: { base: 2, md: 6 },
                    },
                    '& td': {
                        fontSize: 'sm',
                        color: 'blackAlpha.900',
                        py: { base: 2.5, lg: 4 },
                        px: { base: 2, md: 6 },
                    },
                }}
            >
                <Thead>
                    <Tr>
                        <Th>Ингридиенты</Th>
                        <Th pr={0}>
                            <FormControl
                                display='flex'
                                justifyContent='end'
                                alignItems='center'
                                gap={{ base: 3, md: 4 }}
                            >
                                <FormLabel fontWeight='inherit' fontSize='inherit' m={0}>
                                    Порций
                                </FormLabel>
                                <NumberInput
                                    min={1}
                                    w='90px'
                                    max={99999}
                                    value={portions}
                                    onChange={(_, value) => setPortions(value)}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </FormControl>
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {ingridients.map((ingridient) => (
                        <Tr key={ingridient.title}>
                            <Td fontWeight='medium'>{ingridient.title}</Td>
                            <Td textAlign='end'>
                                {Number(
                                    ((portions / defaultPortions) * ingridient.count).toFixed(2),
                                )}{' '}
                                {ingridient.measureUnit}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};
