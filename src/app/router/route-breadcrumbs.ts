import { BlogDetailed } from '~/entities/blog/interface';
import { ActiveCategories, buildCategoryPath } from '~/entities/category';
import { Recipe } from '~/entities/recipe';
import { BreadcrumbDefinition, createCrumbDefinition } from '~/features/breadcrumbs';
import { RoutePath } from '~/shared/router';
import { TestId } from '~/shared/test-ids';
import { formatUsername, getFullName } from '~/shared/util';

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

const recipeCrumb = createCrumbDefinition<ActiveCategories, Recipe>(({ match }) => ({
    label: match.data?.title,
}));

export const categoryCrumbs = createCrumbDefinition<ActiveCategories>(
    (args) => [rootCategoryCrumb(args), subCategoryCrumb(args)] as BreadcrumbDefinition[],
);

export const recipeCrumbs = createCrumbDefinition<ActiveCategories, Recipe>(
    (args) =>
        [
            rootCategoryCrumb(args),
            subCategoryCrumb(args),
            recipeCrumb(args),
        ] as BreadcrumbDefinition[],
);

export const blogsCrumb = createCrumbDefinition({
    label: 'Блоги',
    href: RoutePath.Blogs,
    testId: TestId.BREADCRUMB_BLOGS,
});

const blogCrumb = createCrumbDefinition<unknown, BlogDetailed>(({ match }) => {
    const { firstName, lastName, login } = match.data.bloggerInfo;
    return {
        label: `${getFullName(firstName, lastName)} (${formatUsername(login)})`,
        testId: TestId.BREADCRUMB_BLOGGER,
    };
});

export const blogCrumbs = createCrumbDefinition<unknown, BlogDetailed>(
    (args) => [blogsCrumb, blogCrumb(args)] as BreadcrumbDefinition[],
);
