import { Location, UIMatch } from 'react-router';

export interface RouteBreadcrumb<ExtraArg = unknown, Data = unknown> {
    crumb?:
        | BreadcrumbDefinition
        | BreadcrumbDefinition[]
        | ((arg: {
              match: UIMatch<Data>;
              location: Location;
              extraArg: ExtraArg;
          }) => BreadcrumbDefinition | BreadcrumbDefinition[] | undefined);
}

export interface BreadcrumbData {
    label: string;
    href?: string;
}

export type BreadcrumbDefinition = BreadcrumbData | string;
