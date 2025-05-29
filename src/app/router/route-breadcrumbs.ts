import { ActiveCategories, buildCategoryPath } from '~/entities/category';
import { RecipeWithAuthor } from '~/entities/recipe';
import { BreadcrumbDefinition, RouteBreadcrumbDefinition } from '~/features/breadcrumbs';
import { RoutePath } from '~/shared/router';

export const mainCrumb: RouteBreadcrumbDefinition = ({ location }) =>
    location.pathname === RoutePath.NotFound ? undefined : 'Главная';

export const juiciestCrumb = 'Самое сочное';

export const newRecipeCrumb = 'Новый рецeпт';

export const rootCategoryCrumb: RouteBreadcrumbDefinition<ActiveCategories> = ({
    extraArg: [root],
}) => ({
    label: root.title,
    href: buildCategoryPath(root, root.subCategories[0]),
});

export const subCategoryCrumb: RouteBreadcrumbDefinition<ActiveCategories> = ({
    extraArg: [_, sub],
}) => sub.title;

export const recipeCrumb: RouteBreadcrumbDefinition<ActiveCategories, RecipeWithAuthor> = ({
    match,
}) => ({ label: match.data?.title });

export const updateRecipeCrumb: RouteBreadcrumbDefinition<ActiveCategories, RecipeWithAuthor> = (
    args,
) => [rootCategoryCrumb(args), subCategoryCrumb(args), recipeCrumb(args)] as BreadcrumbDefinition[];
