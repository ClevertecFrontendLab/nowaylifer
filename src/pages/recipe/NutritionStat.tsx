import { Stat, StatHelpText, StatLabel, StatNumber, StatProps } from '@chakra-ui/react';

export interface NutritionStatProps extends StatProps {
    name: string;
    value: number | string;
    measureUnit?: string;
}

export const NutritionStat = ({
    name,
    value,
    measureUnit = 'грамм',
    ...rest
}: NutritionStatProps) => (
    <Stat
        borderRadius='2xl'
        borderWidth='1px'
        px={{ base: 3, md: 4 }}
        py={4}
        sx={{
            '& > dl': {
                display: { base: 'grid', md: 'flex' },
                gridTemplateColumns: '118px 1fr 61px',
                flexDir: 'column',
                alignItems: 'center',
                gap: { base: 1, md: 3 },
            },
        }}
        {...rest}
    >
        <StatLabel fontSize='sm' color='blackAlpha.600'>
            {name}
        </StatLabel>
        <StatNumber
            justifySelf='center'
            lineHeight={{ base: 'short', md: 1.11 }}
            color='lime.800'
            fontSize={{ base: '2xl', md: '4xl' }}
        >
            {value}
        </StatNumber>
        <StatHelpText m={0} textTransform='uppercase' color='blackAlpha.900'>
            {measureUnit}
        </StatHelpText>
    </Stat>
);
