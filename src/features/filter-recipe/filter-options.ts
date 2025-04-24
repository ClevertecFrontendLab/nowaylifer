import { recipeCategoryMap } from '~/entities/recipe';

import { FilterType } from './types';
import { Option } from './ui/MultiSelect';

export const filterOptions: Record<FilterType, Option[]> = {
    allergens: [
        { label: 'Молочные продукты', value: 'молочные продукты', testId: 'allergen-0' },
        { label: 'Яйцо', value: 'яйцо', testId: 'allergen-1' },
        { label: 'Рыба', value: 'рыба', testId: 'allergen-2' },
        { label: 'Моллюски', value: 'моллюски', testId: 'allergen-3' },
        { label: 'Орехи', value: 'орехи', testId: 'allergen-4' },
        { label: 'Томат (помидор)', value: 'томат', testId: 'allergen-5' },
        { label: 'Цитрусовые', value: 'цитрусовые', testId: 'allergen-6' },
        { label: 'Клубника (ягоды)', value: 'ягоды', testId: 'allergen-7' },
        { label: 'Шоколад', value: 'шоколад', testId: 'allergen-8' },
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
    categories: Object.values(recipeCategoryMap).map((c) => ({
        label: c.label,
        value: c.slug,
        testId: c.slug === 'vegan' ? 'checkbox-веганская кухня' : undefined,
    })),
    meat: [
        { label: 'Курица', value: 'курица' },
        { label: 'Свинина', value: 'свинина' },
        { label: 'Говядина', value: 'говядина' },
        { label: 'Индейка', value: 'индейка' },
        { label: 'Утка', value: 'утка' },
    ],
    side: [
        { label: 'Картошка', value: 'картошка', testId: 'checkbox-картошка' },
        { label: 'Гречка', value: 'гречка' },
        { label: 'Паста', value: 'паста' },
        { label: 'Спагетти', value: 'спагетти' },
        { label: 'Рис', value: 'рис' },
        { label: 'Капуста', value: 'капуста' },
        { label: 'Фасоль', value: 'фасоль' },
        { label: 'Другие овощи', value: 'другие овощи' },
    ],
};
