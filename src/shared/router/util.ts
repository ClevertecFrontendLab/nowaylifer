import { generatePath } from 'react-router';

export const joinPath = (...segments: string[]): string =>
    '/' +
    segments
        .map((s) => s.replace(/^\/|\/$/g, '')) // strip leading/trailing slashes
        .filter(Boolean)
        .join('/');

export const definePath = <Params extends Record<string, string>>(pattern: string) => ({
    pattern,
    build: (params: Params) => generatePath(pattern, params),
});
