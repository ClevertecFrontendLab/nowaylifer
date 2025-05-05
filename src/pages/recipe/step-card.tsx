import { Badge, Card, CardBody, CardProps, Image, Text } from '@chakra-ui/react';

export interface StepCardProps extends CardProps {
    stepNumber: number;
    description: string;
    image?: string;
}

export const StepCard = ({ stepNumber, description, image }: StepCardProps) => (
    <Card direction='row' overflow='hidden' minH='128px'>
        {image && (
            <Image
                src={image}
                width='full'
                objectFit='cover'
                maxWidth={{ base: '158px', lg: '346px' }}
            />
        )}
        <CardBody px={{ base: 2, lg: 6 }} py={{ base: 2, lg: 5 }}>
            <Badge h={6} px={2} bg='blackAlpha.100' mb={{ base: 3, lg: 4 }}>
                Шаг {stepNumber}
            </Badge>
            <Text fontSize='sm'>{description}</Text>
        </CardBody>
    </Card>
);
