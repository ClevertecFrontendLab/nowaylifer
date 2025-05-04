import { TestId } from '~/shared/test-ids';

import { FilterOption, FilterType } from './types';

export const defaultFilterOptions: Record<FilterType, Omit<FilterOption, 'type'>[]> = {
    allergens: [
        { label: 'Молочные продукты', value: 'молочные продукты' },
        { label: 'Яйцо', value: 'яйцо' },
        { label: 'Рыба', value: 'рыба' },
        { label: 'Моллюски', value: 'моллюски' },
        { label: 'Орехи', value: 'орехи' },
        { label: 'Томат (помидор)', value: 'томат' },
        { label: 'Цитрусовые', value: 'цитрусовые' },
        { label: 'Клубника (ягоды)', value: 'ягоды' },
        { label: 'Шоколад', value: 'шоколад' },
    ],
    authors: [
        { label: 'Елена Мин', value: 'Елена Мин' },
        { label: 'Мирием Чонишвили', value: 'Мирием Чонишвили' },
        { label: 'Елена Прекрасная', value: 'Елена Прекрасная' },
        { label: 'Alex Cook', value: 'Alex Cook' },
        { label: 'Екатерина Константинопольская', value: 'Екатерина Константинопольская' },
        { label: 'Инна Высоцкая', value: 'Инна Высоцкая' },
        { label: 'Сергей Разумов', value: 'Сергей Разумов' },
        { label: 'Анна Рогачева', value: 'Анна Рогачева' },
        { label: 'Иван Орлов', value: 'Иван Орлов' },
        { label: 'Повар Ши', value: 'Повар Ши' },
        { label: 'Только новые авторы', value: 'Только новые авторы' },
    ],
    categories: [],
    meat: [
        { label: 'Курица', value: 'курица' },
        { label: 'Свинина', value: 'свинина' },
        { label: 'Говядина', value: 'говядина' },
        { label: 'Индейка', value: 'индейка' },
        { label: 'Утка', value: 'утка' },
    ],
    garnish: [
        { label: 'Картошка', value: 'картошка', testId: TestId.POTATO_GARNISH_OPTION },
        { label: 'Гречка', value: 'гречка' },
        { label: 'Паста', value: 'паста' },
        { label: 'Спагетти', value: 'спагетти' },
        { label: 'Рис', value: 'рис' },
        { label: 'Капуста', value: 'капуста' },
        { label: 'Фасоль', value: 'фасоль' },
        { label: 'Другие овощи', value: 'другие овощи' },
    ],
};
