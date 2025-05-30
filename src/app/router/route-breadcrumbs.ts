import { ActiveCategories, buildCategoryPath } from '~/entities/category';
import { RecipeWithAuthor } from '~/entities/recipe';
import { BreadcrumbDefinition, RouteBreadcrumbDefinition } from '~/features/breadcrumbs';
import { RoutePath } from '~/shared/router';

export const mainCrumb: RouteBreadcrumbDefinition = ({ location }) =>
    location.pathname === RoutePath.NotFound ? undefined : 'Главная';

export const juiciestCrumb = 'Самое сочное';

export const newRecipeCrumb = 'Новый рецeпт';

const rootCategoryCrumb: RouteBreadcrumbDefinition<ActiveCategories> = ({ extraArg: [root] }) => ({
    label: root.title,
    href: buildCategoryPath(root, root.subCategories[0]),
});

const subCategoryCrumb: RouteBreadcrumbDefinition<ActiveCategories> = ({ extraArg: [_, sub] }) =>
    sub.title;

const recipeCrumb: RouteBreadcrumbDefinition<ActiveCategories, RecipeWithAuthor> = ({ match }) => ({
    label: match.data?.title,
});

export const categoryCrumbs: RouteBreadcrumbDefinition<ActiveCategories> = (args) =>
    [rootCategoryCrumb(args), subCategoryCrumb(args)] as BreadcrumbDefinition[];

export const recipeCrumbs: RouteBreadcrumbDefinition<ActiveCategories, RecipeWithAuthor> = (args) =>
    [rootCategoryCrumb(args), subCategoryCrumb(args), recipeCrumb(args)] as BreadcrumbDefinition[];
