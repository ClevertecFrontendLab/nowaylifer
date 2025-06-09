import { cloneDeepWith, isString } from 'lodash-es';

import { MEDIA_BASE_URL } from './config';

export { HTTPMethod as HttpMethod } from 'http-method-enum';
export { StatusCodes as HttpStatusCode } from 'http-status-codes';

export const buildMediaSrc = (path: string) => new URL(path, MEDIA_BASE_URL).href;

export const isE2E = () => !!window.Cypress;

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

export const pluralizeRu = (number: number, forms: PluralForms): string => {
    const pr = new Intl.PluralRules('ru');
    const category = pr.select(number);
    return forms[category] ?? forms.other;
};

export const stripEmptyStringsDeep = <T>(value: T): T =>
    cloneDeepWith(value, (value) => {
        if (isString(value) && value.trim() === '') {
            return null;
        }
    });

export const formatUsername = (username: string) => '@' + username;

export const getFullName = (firstName: string, lastName: string) => firstName + ' ' + lastName;
