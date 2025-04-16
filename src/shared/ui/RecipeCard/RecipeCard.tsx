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
    Wrap,
    WrapItem,
} from '@chakra-ui/react';

import { BookmarkIcon } from '../BookmarkIcon';
import { Button } from '../Button';
import { ClockIcon } from '../ClockIcon';
import { EmojiHeartEyesIcon } from '../EmojiHeartEyesIcon';
import { BookmarksStat, LikesStat } from '../Stats';
import { RecipeCardStyles, RecipeCardVariant, themeKey } from './RecipeCard.theme';

const [StylesProvider, useStyles] = createStylesContext(themeKey);

interface RecipeCardRootProps extends Omit<CardProps, 'title'> {
    variant?: RecipeCardVariant;
}

const RecipeCardRoot = (props: RecipeCardRootProps) => {
    const { size, variant, children, ...rest } = props;
    const styles = useMultiStyleConfig(themeKey, { size, variant }) as RecipeCardStyles;
    return (
        <Card {...styles.root} {...rest}>
            <StylesProvider value={styles}>{children}</StylesProvider>
        </Card>
    );
};

const RecipeCardBody = (props: CardBodyProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return <CardBody {...styles.body} {...props} />;
};

const RecipeCardTitle = (props: HeadingProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return <Heading {...styles.title} {...props} />;
};

const RecipeCardDescription = (props: TextProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return <Text {...styles.description} {...props} />;
};

const RecipeCardStats = ({ likes = 0, bookmarks = 0 }: { likes?: number; bookmarks?: number }) => {
    const styles = useStyles() as RecipeCardStyles;
    return (
        <HStack {...styles.stats}>
            {bookmarks > 0 && <BookmarksStat value={bookmarks} />}
            {likes > 0 && <LikesStat value={likes} />}
        </HStack>
    );
};

const RecipeCardBadge = ({ children, ...rest }: BadgeProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return (
        <Badge {...styles.badge} {...rest}>
            {children}
        </Badge>
    );
};

const RecipeCardButtons = (props: StackProps) => {
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

const RecipeCardImage = (props: ImageProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return (
        <Box __css={styles.imageContainer}>
            <Image h='full' objectFit='cover' {...styles.image} {...props} />
        </Box>
    );
};

const RecipeCardCategory = ({
    iconSrc,
    label,
    ...rest
}: { iconSrc: string; label: string } & BadgeProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return (
        <RecipeCardBadge {...styles.category} {...rest}>
            <Image src={iconSrc} boxSize={4} />
            {label}
        </RecipeCardBadge>
    );
};

export interface RecipeCardProps extends RecipeCardRootProps {
    variant?: RecipeCardVariant;
    title: React.ReactNode;
    category: { label: string; iconSrc: string }[];
    description?: string;
    image?: string;
    time?: string;
    bookmarks?: number;
    likes?: number;
    recommendation?: {
        avatarSrc: string;
        name: string;
    };
}

const CompactRecipeCard = ({ title, category, ...rest }: RecipeCardProps) => (
    <RecipeCardRoot {...rest}>
        <RecipeCardBody>
            <HStack gap={2} minW={0}>
                <Image boxSize={6} src={category[0].iconSrc} alt={category[0].label} />
                <RecipeCardTitle>{title}</RecipeCardTitle>
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
        </RecipeCardBody>
    </RecipeCardRoot>
);

const VRecipeCard = ({
    variant,
    image,
    title,
    description,
    likes,
    bookmarks,
    category,
    ...rest
}: RecipeCardProps) => (
    <RecipeCardRoot variant={variant} {...rest}>
        {variant !== 'no-image' && <RecipeCardImage src={image} />}
        <RecipeCardBody>
            <Box flexGrow={1}>
                <RecipeCardTitle>{title}</RecipeCardTitle>
                <RecipeCardDescription>{description}</RecipeCardDescription>
            </Box>
            <HStack justify='space-between' gap={0}>
                <RecipeCardCategory iconSrc={category[0].iconSrc} label={category[0].label} />
                <RecipeCardStats bookmarks={bookmarks} likes={likes} />
            </HStack>
        </RecipeCardBody>
    </RecipeCardRoot>
);

const HRecipeCard = ({
    image,
    title,
    description,
    category,
    bookmarks,
    likes,
    recommendation,
    ...rest
}: RecipeCardProps) => (
    <RecipeCardRoot {...rest}>
        <RecipeCardImage src={image} />
        <RecipeCardBody>
            <Box order={1} flexGrow={1}>
                <RecipeCardTitle>{title}</RecipeCardTitle>
                <RecipeCardDescription>{description}</RecipeCardDescription>
            </Box>
            <HStack order={0} justify='space-between' gap={0}>
                <RecipeCardCategory iconSrc={category[0].iconSrc} label={category[0].label} />
                <RecipeCardStats bookmarks={bookmarks} likes={likes} />
            </HStack>
            <RecipeCardButtons order={2} />
        </RecipeCardBody>
        {recommendation && (
            <RecipeCardBadge h={7} hideBelow='lg' bg='lime.150' bottom={5} left={6} pos='absolute'>
                <Avatar size='2xs' src={recommendation.avatarSrc} />
                {`${recommendation.name} рекомендует`}
            </RecipeCardBadge>
        )}
    </RecipeCardRoot>
);

const DetailedRecipeCard = ({
    image,
    bookmarks,
    likes,
    title,
    time,
    description,
    category,
    ...rest
}: RecipeCardProps) => (
    <RecipeCardRoot {...rest}>
        <RecipeCardImage src={image} />
        <RecipeCardBody>
            <Box order={1} flexGrow={1}>
                <RecipeCardTitle>{title}</RecipeCardTitle>
                <RecipeCardDescription>{description}</RecipeCardDescription>
            </Box>
            <HStack order={0} justify='space-between' gap={1}>
                <Wrap gap={2}>
                    {category.map((c) => (
                        <WrapItem key={c.label}>
                            <RecipeCardCategory label={c.label} iconSrc={c.iconSrc} />
                        </WrapItem>
                    ))}
                </Wrap>
                <RecipeCardStats bookmarks={bookmarks} likes={likes} />
            </HStack>
            <HStack order={2} alignItems='end' wrap={{ base: 'wrap', md: 'nowrap' }} gap={3}>
                <RecipeCardBadge bg='blackAlpha.100' mr='auto'>
                    <ClockIcon />
                    {time}
                </RecipeCardBadge>
                <HStack gap={{ base: 3, '2xl': 4 }}>
                    <Button
                        variant='outline'
                        size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                        leftIcon={<EmojiHeartEyesIcon />}
                    >
                        Оценить рецепт
                    </Button>
                    <Button
                        bg='lime.400'
                        size={{ base: 'xs', lg: 'sm', '2xl': 'lg' }}
                        leftIcon={<BookmarkIcon />}
                    >
                        Сохранить в закладки
                    </Button>
                </HStack>
            </HStack>
        </RecipeCardBody>
    </RecipeCardRoot>
);

export const RecipeCard = ({ variant = 'vertical', ...props }: RecipeCardProps) => {
    switch (variant) {
        case 'vertical':
        case 'no-image':
            return <VRecipeCard variant={variant} {...props} />;
        case 'horizontal':
            return <HRecipeCard variant={variant} {...props} />;
        case 'compact':
            return <CompactRecipeCard variant={variant} {...props} />;
        case 'detailed':
            return <DetailedRecipeCard variant={variant} {...props} />;
        default:
            throw new Error('Unknown variant');
    }
};
