import { Location, UIMatch } from 'react-router';

export type RouteBreadcrumbDefinition<ExtraArg = unknown, Data = unknown> =
    | BreadcrumbDefinition
    | BreadcrumbDefinition[]
    | ((arg: {
          match: UIMatch<Data>;
          location: Location;
          extraArg: ExtraArg;
      }) => BreadcrumbDefinition | BreadcrumbDefinition[] | undefined);

export interface RouteBreadcrumb<ExtraArg = unknown, Data = unknown> {
    crumb?: RouteBreadcrumbDefinition<ExtraArg, Data>;
}

export interface BreadcrumbData {
    label: string;
    href?: string;
}

export type BreadcrumbDefinition = BreadcrumbData | string | undefined;
