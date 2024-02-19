import type { ResultStatusType } from 'antd/lib/result';
import { Path } from '@router/paths';

export type ResultConfig = {
    status: ResultStatusType;
    title: string;
    subTitle: string;
    buttonText: string;
    redirectTo: string;
};

export type ResultStatus = keyof typeof resultConfigs;

export const resultConfigs = {
    'error-login': {
        status: 'warning',
        title: 'Вход не выполнен',
        subTitle: 'Что-то пошло не так. Попробуйте еще раз',
        buttonText: 'Повторить',
        redirectTo: Path.Login,
    },
    success: {
        status: 'success',
        title: 'Регистрация успешна',
        subTitle:
            'Регистрация прошла успешна. Зайдите в приложение, используя свои e-mail и пароль.',
        buttonText: 'Войти',
        redirectTo: Path.Login,
    },
    'error-user-exist': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        buttonText: 'Назад к регистрации',
        redirectTo: Path.Register,
    },
    error: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        buttonText: 'Повторить',
        redirectTo: Path.Register,
    },
} satisfies Record<string, ResultConfig>;
