import type { Rule, RuleRender } from 'antd/lib/form';

export const required: Rule = { required: true, message: '' };
export const email: Rule = { type: 'email', message: '' };
export const password: Rule = {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: '',
};

export const confirmPassword: (name: string) => RuleRender =
    (name) =>
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue(name) === value) {
                return Promise.resolve();
            }
            return Promise.reject(new Error('Пароли не совпадают'));
        },
    });
