import type { ResultStatusType } from 'antd/lib/result';
import type { ResultStatus } from 'src/types';

export type ResultConfig = {
    status: ResultStatusType;
    title: string;
    subTitle: string;
    buttonText: string;
};

type ResultConfigMap = {
    [K in ResultStatus]: ResultConfig;
};

export const resultConfigs: ResultConfigMap = {
    'error-login': {
        status: 'warning',
        title: 'Вход не выполнен',
        subTitle: 'Что-то пошло не так. Попробуйте еще раз',
        buttonText: 'Повторить',
    },
    success: {
        status: 'success',
        title: 'Регистрация успешна',
        subTitle:
            'Регистрация прошла успешна. Зайдите в приложение, используя свои e-mail и пароль.',
        buttonText: 'Войти',
    },
    'error-user-exist': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        buttonText: 'Назад к регистрации',
    },
    error: {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        buttonText: 'Повторить',
    },
    'error-check-email-no-exist': {
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        subTitle: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail',
        buttonText: 'Попробовать снова',
    },
    'error-check-email': {
        status: 500,
        title: 'Что-то пошло не так',
        subTitle: 'Произошла ошибка, попробуйте отправить форму ещё раз',
        buttonText: 'Назад',
    },
    'error-change-password': {
        status: 'error',
        title: 'Данные не сохранились',
        subTitle: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'Повторить',
    },
    'success-change-password': {
        status: 'success',
        title: 'Пароль успешно изменен',
        subTitle: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        buttonText: 'Вход',
    },
};
