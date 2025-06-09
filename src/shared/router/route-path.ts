import { definePath, joinPath } from './util';

export enum RouteParam {
    RootCategory = 'rootCategory',
    SubCategory = 'subCategory',
    RecipeId = 'recipeId',
    UserId = 'userId',
}

type RouteParamSubset<T extends RouteParam> = Pick<Record<RouteParam, string>, T>;

type RecipeParams = RouteParamSubset<
    RouteParam.RootCategory | RouteParam.SubCategory | RouteParam.RecipeId
>;

const categoryPattern = joinPath(`:${RouteParam.RootCategory}`, `:${RouteParam.SubCategory}`);
const recipePattern = joinPath(categoryPattern, `:${RouteParam.RecipeId}`);

export const RoutePath = {
    Main: '/',
    Juiciest: '/the-juiciest',
    NotFound: '/not-found',
    Login: '/login',
    Signup: '/signup',
    EmailVerificationCallback: '/verification',
    NewRecipe: '/new-recipe',
    Category:
        definePath<RouteParamSubset<RouteParam.RootCategory | RouteParam.SubCategory>>(
            categoryPattern,
        ),
    Recipe: definePath<RecipeParams>(recipePattern),
    EditRecipe: definePath<RecipeParams>(joinPath('edit-recipe', recipePattern)),
    Blogs: '/blogs',
    Blog: definePath<RouteParamSubset<RouteParam.UserId>>(
        joinPath('blogs', `:${RouteParam.UserId}`),
    ),
};
