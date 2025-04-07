import {
    Avatar,
    Badge,
    BadgeProps,
    Box,
    Card,
    CardBody,
    CardBodyProps,
    CardProps,
    createStylesContext,
    Heading,
    HeadingProps,
    HStack,
    IconButton,
    Image,
    ImageProps,
    StackProps,
    Text,
    TextProps,
    useBreakpointValue,
    useMultiStyleConfig,
} from '@chakra-ui/react';
import React from 'react';

import { BookmarkIcon } from '../BookmarkIcon';
import { Button } from '../Button';
import { BookmarksStat, LikesStat } from '../Stats';
import { DishCardStyles, DishCardVariant } from './DishCard.theme';

const [StylesProvider, useStyles] = createStylesContext('DishCard');

interface DishCardRootProps extends Omit<CardProps, 'title'> {
    variant?: DishCardVariant;
}

const DishCardRoot = (props: DishCardRootProps) => {
    const { size, variant, children, ...rest } = props;
    const styles = useMultiStyleConfig('DishCard', { size, variant }) as DishCardStyles;
    return (
        <Card {...styles.root} {...rest}>
            <StylesProvider value={styles}>{children}</StylesProvider>
        </Card>
    );
};

const DishCardBody = (props: CardBodyProps) => {
    const styles = useStyles() as DishCardStyles;
    return <CardBody {...styles.body} {...props} />;
};

const DishCardTitle = (props: HeadingProps) => {
    const styles = useStyles() as DishCardStyles;
    return <Heading {...styles.title} {...props} />;
};

const DishCardDescription = (props: TextProps) => {
    const styles = useStyles() as DishCardStyles;
    return <Text {...styles.description} {...props} />;
};

const DishCardStats = ({ likes = 0, bookmarks = 0 }: { likes?: number; bookmarks?: number }) => {
    const styles = useStyles() as DishCardStyles;
    return (
        <HStack {...styles.stats}>
            {bookmarks > 0 && <BookmarksStat value={bookmarks} />}
            {likes > 0 && <LikesStat value={bookmarks} />}
        </HStack>
    );
};

const DishCardBadge = ({ children, ...rest }: BadgeProps) => {
    const styles = useStyles() as DishCardStyles;
    return (
        <Badge {...styles.badge} {...rest}>
            {children}
        </Badge>
    );
};

const DishCardButtons = (props: StackProps) => {
    const lg = useBreakpointValue({ base: false, lg: true });
    return (
        <HStack gap={2} justifyContent='end' {...props}>
            {lg ? (
                <Button variant='outline' size='sm' leftIcon={<BookmarkIcon />}>
                    Сохранить
                </Button>
            ) : (
                <IconButton
                    size='xs'
                    variant='outline'
                    aria-label='Сохранить'
                    icon={<BookmarkIcon />}
                />
            )}
            <Button variant='inverted' size={{ base: 'xs', lg: 'sm' }}>
                Готовить
            </Button>
        </HStack>
    );
};

const DishCardImage = (props: ImageProps) => {
    const styles = useStyles() as DishCardStyles;
    return (
        <Box __css={styles.imageContainer}>
            <Image h='full' objectFit='cover' {...props} />
        </Box>
    );
};

const DishCardCategory = ({
    iconSrc,
    label,
    ...rest
}: { iconSrc: string; label: string } & BadgeProps) => {
    const styles = useStyles() as DishCardStyles;
    return (
        <DishCardBadge {...styles.category} {...rest}>
            <Image src={iconSrc} boxSize={4} />
            {label}
        </DishCardBadge>
    );
};

export interface DishCardProps extends DishCardRootProps {
    variant?: DishCardVariant;
    title: React.ReactNode;
    category: { label: string; iconSrc: string };
    description?: string;
    imgSrc?: string;
    bookmarks?: number;
    likes?: number;
    recommendation?: {
        avatarSrc: string;
        name: string;
    };
}

const CDishCard = ({ title, category, ...rest }: DishCardProps) => (
    <DishCardRoot {...rest}>
        <DishCardBody>
            <HStack gap={2} minW={0}>
                <Image boxSize={6} src={category.iconSrc} alt={category.label} />
                <DishCardTitle>{title}</DishCardTitle>
            </HStack>
            <Button
                size={{ base: 'xs', lg: 'sm' }}
                flexShrink={0}
                variant='outline'
                color='lime.600'
                borderColor='lime.600'
            >
                Готовить
            </Button>
        </DishCardBody>
    </DishCardRoot>
);

const VDishCard = ({
    variant,
    imgSrc,
    title,
    description,
    likes,
    bookmarks,
    category,
    ...rest
}: DishCardProps) => (
    <DishCardRoot variant={variant} {...rest}>
        {variant !== 'no-image' && <DishCardImage src={imgSrc} />}
        <DishCardBody>
            <Box flexGrow={1}>
                <DishCardTitle>{title}</DishCardTitle>
                <DishCardDescription>{description}</DishCardDescription>
            </Box>
            <HStack justify='space-between' gap={0}>
                <DishCardCategory iconSrc={category.iconSrc} label={category.label} />
                <DishCardStats bookmarks={bookmarks} likes={likes} />
            </HStack>
        </DishCardBody>
    </DishCardRoot>
);

const HDishCard = ({
    imgSrc,
    title,
    description,
    category,
    bookmarks,
    likes,
    recommendation,
    ...rest
}: DishCardProps) => (
    <DishCardRoot {...rest}>
        <DishCardImage src={imgSrc} />
        <DishCardBody>
            <Box order={1} flexGrow={1}>
                <DishCardTitle>{title}</DishCardTitle>
                <DishCardDescription>{description}</DishCardDescription>
            </Box>
            <HStack order={0} justify='space-between' gap={0}>
                <DishCardCategory iconSrc={category.iconSrc} label={category.label} />
                <DishCardStats bookmarks={bookmarks} likes={likes} />
            </HStack>
            <DishCardButtons order={2} />
        </DishCardBody>
        {recommendation && (
            <DishCardBadge h={7} hideBelow='lg' bg='lime.150' bottom={5} left={6} pos='absolute'>
                <Avatar size='2xs' src={recommendation.avatarSrc} />
                {`${recommendation.name} рекомендует`}
            </DishCardBadge>
        )}
    </DishCardRoot>
);

export const DishCard = ({ variant = 'vertical', ...props }: DishCardProps) => {
    switch (variant) {
        case 'vertical':
        case 'no-image':
            return <VDishCard variant={variant} {...props} />;
        case 'horizontal':
            return <HDishCard variant={variant} {...props} />;
        case 'compact':
            return <CDishCard variant={variant} {...props} />;
        default:
            throw new Error('Unknown variant');
    }
};
