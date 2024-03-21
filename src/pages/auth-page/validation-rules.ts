import type { Rule, RuleRender } from 'antd/lib/form';

export const required: Rule = { required: true, message: '' };
export const email: Rule = { type: 'email', message: '' };
export const password: Rule = {
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/,
    message: '',
};

export const confirmPassword: (name?: string) => RuleRender =
    (name = 'password') =>
    ({ getFieldValue }) => ({
        validator(_, value) {
            if (!value || getFieldValue(name) === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('Пароли не совпадают'));
        },
    });
