import {
    BreadcrumbDefinition,
    RouteBreacrumbDefinitionFunction,
    RouteBreadcrumbDefinition,
} from './types';

export function createCrumbDefinition<ExtraArg = unknown, Data = unknown>(
    def: RouteBreacrumbDefinitionFunction<ExtraArg, Data>,
): RouteBreacrumbDefinitionFunction<ExtraArg, Data>;

export function createCrumbDefinition<ExtraArg = unknown, Data = unknown>(
    def: BreadcrumbDefinition | BreadcrumbDefinition[],
): RouteBreadcrumbDefinition<ExtraArg, Data>;

export function createCrumbDefinition(def: RouteBreadcrumbDefinition): RouteBreadcrumbDefinition {
    return def;
}
