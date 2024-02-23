type Concat<T extends string[]> = T extends [infer F extends string, ...infer R extends string[]]
    ? `${F}${Concat<R>}`
    : '';

export const concat = <T extends string[]>(...strings: T) => strings.join() as Concat<T>;
