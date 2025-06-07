import { ActiveCategories, buildCategoryPath } from '~/entities/category';
import { RecipeWithAuthor } from '~/entities/recipe';
import { BreadcrumbDefinition, createCrumbDefinition } from '~/features/breadcrumbs';
import { RoutePath } from '~/shared/router';

export const mainCrumb = createCrumbDefinition(({ location }) =>
    location.pathname === RoutePath.NotFound ? undefined : 'Главная',
);

export const juiciestCrumb = createCrumbDefinition('Самое сочное');

export const newRecipeCrumb = createCrumbDefinition('Новый рецeпт');

const rootCategoryCrumb = createCrumbDefinition<ActiveCategories>(({ extraArg: [root] }) => ({
    label: root.title,
    href: buildCategoryPath(root, root.subCategories[0]),
}));

const subCategoryCrumb = createCrumbDefinition<ActiveCategories>(
    ({ extraArg: [_, sub] }) => sub.title,
);

const recipeCrumb = createCrumbDefinition<ActiveCategories, RecipeWithAuthor>(({ match }) => ({
    label: match.data?.title,
}));

export const categoryCrumbs = createCrumbDefinition<ActiveCategories>(
    (args) => [rootCategoryCrumb(args), subCategoryCrumb(args)] as BreadcrumbDefinition[],
);

export const recipeCrumbs = createCrumbDefinition<ActiveCategories, RecipeWithAuthor>(
    (args) =>
        [
            rootCategoryCrumb(args),
            subCategoryCrumb(args),
            recipeCrumb(args),
        ] as BreadcrumbDefinition[],
);
export const recipeCrumbs: RouteBreadcrumbDefinition<ActiveCategories, RecipeWithAuthor> = (args) =>
    [rootCategoryCrumb(args), subCategoryCrumb(args), recipeCrumb(args)] as BreadcrumbDefinition[];

export const blogsCrumb = createCrumbDefinition({ label: 'Блоги', href: RoutePath.Blogs });
