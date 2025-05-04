import { IMAGE_BASE_URL } from './config';

export const buildImageSrc = (path: string) => new URL(path, IMAGE_BASE_URL).href;

export const isE2E = () => !!window.Cypress;
export const { toast } = createStandaloneToast();
