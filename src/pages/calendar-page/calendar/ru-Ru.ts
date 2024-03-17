import ruRu from 'antd/es/calendar/locale/ru_RU';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';

const extend: Partial<PickerLocale['lang']> = {
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
    dateFormat: 'd',
};

export default { ...ruRu, lang: { ...ruRu.lang, ...extend } };
