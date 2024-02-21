import type { ResultStatusType } from 'antd/lib/result';
import type { ResultStatus } from 'src/types';

export type ResultConfig = {
    status: ResultStatusType;
    title: string;
    subTitle: string;
    buttonText: string;
};

export const resultConfigs: Record<ResultStatus, ResultConfig> = {
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
};
