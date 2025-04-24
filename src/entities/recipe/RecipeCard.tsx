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
    HTMLChakraProps,
    IconButton,
    Image,
    ImageProps,
    LinkBox,
    LinkOverlay,
    ResponsiveValue,
    StackProps,
    Text,
    TextProps,
    useBreakpointValue,
    useMultiStyleConfig,
    useTheme,
    Wrap,
    WrapItem,
    WrapProps,
} from '@chakra-ui/react';
import { createContext, isObject } from '@chakra-ui/utils';
import { useMemo } from 'react';

import { Link } from '~/shared/ui/Link';

import { BookmarkIcon } from '../../shared/ui/BookmarkIcon';
import { Button } from '../../shared/ui/Button';
import { ClockIcon } from '../../shared/ui/ClockIcon';
import { EmojiHeartEyesIcon } from '../../shared/ui/EmojiHeartEyesIcon';
import { BookmarksStat, LikesStat } from '../../shared/ui/Stats';
import { buildRecipeLink } from './build-recipe-link';
import { Recipe } from './interface';
import { recipeCategoryMap } from './recipe-category';
import { RecipeCardStyles, RecipeCardVariant, themeKey } from './RecipeCard.theme';

const [StylesProvider, useStyles] = createStylesContext(themeKey);

type RecipeContext = { recipe: Recipe; recipeLink?: string };
const [RecipeContextProvider, useRecipeContext] = createContext<RecipeContext>();

interface RecipeCardRootProps extends Omit<CardProps, 'title'> {
    recipeLink?: string;
    variant?: RecipeCardVariant;
    recipe: Recipe;
}

export interface RecipeCardProps extends RecipeCardRootProps {
    renderTitle?: (styleProps: HTMLChakraProps<'div'>) => React.ReactNode;
}

const RecipeCardRoot = (props: RecipeCardRootProps) => {
    const { size, variant, children, recipe, recipeLink, ...rest } = props;
    const styles = useMultiStyleConfig(themeKey, { size, variant }) as RecipeCardStyles;
    const context = useMemo(
        () => ({ recipe, recipeLink: recipeLink || buildRecipeLink(recipe) }),
        [recipe, recipeLink],
    );
    return (
        <RecipeContextProvider value={context}>
            <Card as={LinkBox} {...styles.root} {...rest}>
                <StylesProvider value={styles}>{children}</StylesProvider>
            </Card>
        </RecipeContextProvider>
    );
};

const RecipeCardBody = (props: CardBodyProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return <CardBody {...styles.body} {...props} />;
};

const RecipeCardTitle = ({
    children,
    ...rest
}: Omit<HeadingProps, 'children'> & {
    children?: React.ReactNode | ((styleProps: HTMLChakraProps<'div'>) => React.ReactNode);
}) => {
    const styles = useStyles() as RecipeCardStyles;
    const { recipeLink } = useRecipeContext();
    return typeof children === 'function' ? (
        children(styles.title)
    ) : (
        <LinkOverlay as={Link} to={recipeLink} minW={0}>
            <Heading {...styles.title} {...rest}>
                {children}
            </Heading>
        </LinkOverlay>
    );
};

const RecipeCardDescription = (props: TextProps) => {
    const styles = useStyles() as RecipeCardStyles;
    return <Text {...styles.description} {...props} />;
};

const RecipeCardStats = ({ likes = 0, bookmarks = 0 }: { likes?: number; bookmarks?: number }) => {
    const styles = useStyles() as RecipeCardStyles;
    return (
        <Box {...styles.stats}>
            {bookmarks > 0 && <BookmarksStat value={bookmarks} />}
            {likes > 0 && <LikesStat value={likes} />}
        </Box>
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
    const { recipeLink } = useRecipeContext();
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
            <LinkOverlay as={Link} to={recipeLink}>
                <Button as={Box} variant='inverted' size={{ base: 'xs', lg: 'sm' }}>
                    Готовить
                </Button>
            </LinkOverlay>
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

const CompactRecipeCard = ({ recipe, ...rest }: RecipeCardProps) => (
    <RecipeCardRoot recipe={recipe} {...rest}>
        <RecipeCardBody>
            <HStack gap={2} minW={0}>
                <Image boxSize={6} src={recipeCategoryMap[recipe.category[0]].iconSrc} />
                <RecipeCardTitle>{recipe.title}</RecipeCardTitle>
            </HStack>
            <Button
                size={{ base: 'xs', lg: 'sm' }}
                flexShrink={0}
                as={Link}
                variant='outline'
                color='lime.600'
                borderColor='lime.600'
            >
                Готовить
            </Button>
        </RecipeCardBody>
    </RecipeCardRoot>
);

const VRecipeCard = ({ variant, recipe, ...rest }: RecipeCardProps) => (
    <RecipeCardRoot recipe={recipe} variant={variant} {...rest}>
        {variant !== 'no-image' && <RecipeCardImage src={recipe.image} />}
        <RecipeCardBody>
            <Box flexGrow={1}>
                <RecipeCardTitle>{recipe.title}</RecipeCardTitle>
                <RecipeCardDescription>{recipe.description}</RecipeCardDescription>
            </Box>
            <HStack justify='space-between' gap={0}>
                <RecipeCardCategoryList
                    categories={recipe.category}
                    onlyFirst={variant === 'no-image' ? true : { base: false, lg: true }}
                />
                <RecipeCardStats bookmarks={recipe.bookmarks} likes={recipe.likes} />
            </HStack>
        </RecipeCardBody>
    </RecipeCardRoot>
);

interface RecipeCardCategoryListProps extends WrapProps {
    categories: string[];
    onlyFirst?: ResponsiveValue<boolean>;
}

const getDisplayValue = (bool: boolean) => (bool ? 'none' : null);

const RecipeCardCategoryList = ({ categories, onlyFirst }: RecipeCardCategoryListProps) => {
    const styles = useStyles() as RecipeCardStyles;
    const theme = useTheme<ChakraTheme>();
    const { toArrayValue, isResponsive } = theme.__breakpoints!;
    const value =
        isObject(onlyFirst) && isResponsive(onlyFirst) ? toArrayValue(onlyFirst) : onlyFirst;

    let dp: WrapProps['display'];

    if (Array.isArray(value)) {
        dp = value.map(getDisplayValue);
    } else if (typeof value === 'boolean') {
        dp = getDisplayValue(value) ?? undefined;
    }

    return (
        <Wrap {...styles.categoryList}>
            {categories.map((c, i) => (
                <WrapItem key={c} display={i > 0 ? dp : undefined}>
                    <RecipeCardCategory
                        iconSrc={recipeCategoryMap[c].iconSrc}
                        label={recipeCategoryMap[c].label}
                    />
                </WrapItem>
            ))}
        </Wrap>
    );
};

const HRecipeCard = ({ recipe, renderTitle, ...rest }: RecipeCardProps) => (
    <RecipeCardRoot recipe={recipe} {...rest}>
        <RecipeCardImage src={recipe.image} />
        <RecipeCardBody>
            <Box order={1} flexGrow={1}>
                <RecipeCardTitle>{renderTitle ?? recipe.title}</RecipeCardTitle>
                <RecipeCardDescription>{recipe.description}</RecipeCardDescription>
            </Box>
            <HStack align='start' justify='space-between' order={0}>
                <RecipeCardCategoryList categories={recipe.category} />
                <RecipeCardStats bookmarks={recipe.bookmarks} likes={recipe.likes} />
            </HStack>
            <RecipeCardButtons order={2} />
        </RecipeCardBody>
        {recipe.recommendation && (
            <RecipeCardBadge h={7} hideBelow='lg' bg='lime.150' bottom={5} left={6} pos='absolute'>
                <Avatar size='2xs' src={recipe.recommendation.avatar} />
                {`${recipe.recommendation.displayName} рекомендует`}
            </RecipeCardBadge>
        )}
    </RecipeCardRoot>
);

const DetailedRecipeCard = ({ recipe, ...rest }: RecipeCardProps) => (
    <RecipeCardRoot recipe={recipe} {...rest}>
        <RecipeCardImage src={recipe.image} />
        <RecipeCardBody>
            <Box order={1} flexGrow={1}>
                <RecipeCardTitle>{recipe.title}</RecipeCardTitle>
                <RecipeCardDescription>{recipe.description}</RecipeCardDescription>
            </Box>
            <HStack order={0} justify='space-between' gap={1}>
                <RecipeCardCategoryList categories={recipe.category} />
                <RecipeCardStats bookmarks={recipe.bookmarks} likes={recipe.likes} />
            </HStack>
            <HStack order={2} alignItems='end' wrap={{ base: 'wrap', md: 'nowrap' }} gap={3}>
                <RecipeCardBadge bg='blackAlpha.100' mr='auto'>
                    <ClockIcon />
                    {recipe.time}
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
