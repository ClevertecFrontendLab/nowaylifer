import { cloneDeepWith, isString } from 'lodash-es';

import { MEDIA_BASE_URL } from './config';

export { HTTPMethod as HttpMethod } from 'http-method-enum';
export { StatusCodes as HttpStatusCode } from 'http-status-codes';

export const buildMediaSrc = (path: string) => new URL(path, MEDIA_BASE_URL).href;

export const isE2E = () => !!window.Cypress;

type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
export type XOR<T, U> = (T & Without<U, T>) | (U & Without<T, U>);

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

export const pluralizeRu = (number: number, forms: PluralForms): string => {
    const pr = new Intl.PluralRules('ru');
    const category = pr.select(number);
    return forms[category] ?? forms.other;
};

export const stripEmptyStrings = <T>(value: T): T =>
    cloneDeepWith(value, (value) => {
        if (isString(value) && value.trim() === '') {
            return null;
        }
    });
