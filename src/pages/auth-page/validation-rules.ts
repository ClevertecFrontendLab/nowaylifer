import type { Rule } from 'antd/lib/form';

export const required: Rule = { required: true, message: '' };
export const email: Rule = { type: 'email', message: '' };
export const password: Rule = {
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
};
