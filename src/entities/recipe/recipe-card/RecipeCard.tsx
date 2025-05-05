import { CompactRecipeCard } from './CompactRecipeCard';
import { DetailedRecipeCard } from './DetailedRecipeCard';
import { HorizontalRecipeCard } from './HorizontalRecipeCard';
import { RecipeCardProps } from './props';
import { VerticalRecipeCard } from './VerticalRecipeCard';

export const RecipeCard = ({ variant, ...props }: RecipeCardProps) => {
    switch (variant) {
        case 'vertical':
        case 'no-image':
            return <VerticalRecipeCard variant={variant} {...props} />;
        case 'horizontal':
            return <HorizontalRecipeCard variant={variant} {...props} />;
        case 'compact':
            return <CompactRecipeCard variant={variant} {...props} />;
        case 'detailed':
            return <DetailedRecipeCard variant={variant} {...props} />;
        default:
            return <HorizontalRecipeCard variant='horizontal' {...props} />;
    }
};
