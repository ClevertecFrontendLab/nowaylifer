import { MEDIA_BASE_URL } from './config';

export { HTTPMethod as HttpMethod } from 'http-method-enum';
export { StatusCodes as HttpStatusCode } from 'http-status-codes';

export const buildMediaSrc = (path: string) => new URL(path, MEDIA_BASE_URL).href;

export const isE2E = () => !!window.Cypress;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T & Without<U, T>) | (U & Without<T, U>);
