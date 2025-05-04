export const FILTER_TYPES = ['allergens', 'meat', 'garnish', 'categories', 'authors'] as const;

export type FilterType = (typeof FILTER_TYPES)[number];

export interface Filter {
    type: FilterType;
    label: string;
    value: string;
}

export interface FilterGroup {
    type: FilterType;
    filters: Filter[];
}

export interface FilterOption extends Filter {
    testId?: string;
}

export type FiltersByGroups = Partial<Record<FilterType, Filter[]>>;
