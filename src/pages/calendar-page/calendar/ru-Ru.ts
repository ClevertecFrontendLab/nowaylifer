import ruRu from 'antd/es/calendar/locale/ru_RU';

const extend = {
    shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    shortMonths: [
        'Янв',
        'Фев',
        'Мар',
        'Апр',
        'Май',
        'Июн',
        'Июл',
        'Авг',
        'Сен',
        'Окт',
        'Ноя',
        'Дек',
    ],
};

export default { ...ruRu, lang: { ...ruRu.lang, ...extend } };
