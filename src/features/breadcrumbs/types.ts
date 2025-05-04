import { Location, UIMatch } from 'react-router';

export interface RouteBreadcrumb<ExtraArg = unknown, Data = unknown> {
    crumb?:
        | string
        | BreadcrumbData
        | Array<string | BreadcrumbData>
        | ((
              match: UIMatch<Data>,
              location: Location,
              extraArg: ExtraArg,
          ) => string | BreadcrumbData | Array<string | BreadcrumbData>);
}

export type BreadcrumbData = { href: string; label: string };
