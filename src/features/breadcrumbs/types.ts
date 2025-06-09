import { Location, UIMatch } from 'react-router';

export interface BreadcrumbData {
    label: string;
    href?: string;
    testId?: string;
}

export type BreadcrumbDefinition = BreadcrumbData | string;

export type RouteBreacrumbDefinitionFunction<ExtraArg, Data> = (arg: {
    match: UIMatch<Data>;
    location: Location;
    extraArg: ExtraArg;
}) => BreadcrumbDefinition | BreadcrumbDefinition[] | undefined;

export type RouteBreadcrumbDefinition<ExtraArg = unknown, Data = unknown> =
    | BreadcrumbDefinition
    | BreadcrumbDefinition[]
    | RouteBreacrumbDefinitionFunction<ExtraArg, Data>;

export interface RouteBreadcrumb<ExtraArg = unknown, Data = unknown> {
    crumb?: RouteBreadcrumbDefinition<ExtraArg, Data>;
}
