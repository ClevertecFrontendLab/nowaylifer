import { IMAGE_BASE_URL } from './config';

export { HTTPMethod as HttpMethod } from 'http-method-enum';
export { StatusCodes as HttpStatusCode } from 'http-status-codes';

export const buildImageSrc = (path: string) => new URL(path, IMAGE_BASE_URL).href;

export const isE2E = () => !!window.Cypress;
