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
        <StatLabel fontSize='sm' color='blackAlpha.600' lineHeight={5}>
            {name}
        </StatLabel>
        <StatNumber
            justifySelf='center'
            lineHeight={{ base: 8, md: 10 }}
            color='lime.800'
            fontSize={{ base: '2xl', md: '4xl' }}
        >
            {value}
        </StatNumber>
        <StatHelpText
            m={0}
            opacity={1}
            fontSize={{ base: 'xs', md: 'sm' }}
            lineHeight={{ base: 4, md: 5 }}
            textTransform='uppercase'
            fontWeight='semibold'
            color='blackAlpha.900'
        >
            {measureUnit}
        </StatHelpText>
    </Stat>
);
