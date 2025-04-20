import { useAppDispatch, useAppSelector } from '~/shared/store';

import { MultiSelect, MultiSelectProps, Option } from './MultiSelect';
import { selectExcludedAllergens, setExcludedAllergens } from './slice';

const options: Option[] = [
    { label: 'Молочные продукты', value: 'молочные продукты' },
    { label: 'Яйцо', value: 'яйцо' },
    { label: 'Рыба', value: 'рыба' },
    { label: 'Моллюски', value: 'моллюски' },
    { label: 'Орехи', value: 'орехи' },
    { label: 'Томат (помидор)', value: 'томат' },
    { label: 'Цитрусовые', value: 'цитрусовые' },
    { label: 'Клубника (ягоды)', value: 'ягоды' },
    { label: 'Шоколад', value: 'шоколад' },
];

export const AllergenSelect = (props: MultiSelectProps) => {
    const excludedAllergens = useAppSelector(selectExcludedAllergens);
    const dispatch = useAppDispatch();
    return (
        <MultiSelect
            value={excludedAllergens}
            onChange={(v) => dispatch(setExcludedAllergens(v))}
            placeholder='Выберите из списка...'
            menuInputPlaceholder='Другой аллерген'
            options={options}
            {...props}
        />
    );
};
