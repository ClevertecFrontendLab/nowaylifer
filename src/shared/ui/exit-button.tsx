import { Button } from './button';
import { ExitIcon } from './icons/exit';

export const ExitButton = () => (
    <Button
        leftIcon={<ExitIcon w={3} h={3} />}
        variant='link'
        color='black'
        fontSize='xs'
        fontWeight='semibold'
    >
        Выйти
    </Button>
);
