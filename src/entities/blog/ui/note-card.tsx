import { Card, CardBody, CardProps, chakra, Text } from '@chakra-ui/react';
import { formatDate } from 'date-fns';
import { ru as ruLocale } from 'date-fns/locale';

import { Note } from '../interface';

export interface NoteProps extends CardProps {
    note: Note;
}

export const NoteCard = ({ note, ...props }: NoteProps) => (
    <Card borderRadius='lg' {...props}>
        <CardBody p={6}>
            <chakra.time color='lime.600' fontSize='sm' lineHeight={5} mb={4}>
                {formatDate(note.date, 'dd MMMM yyyy', { locale: ruLocale })}
            </chakra.time>
            <Text fontSize='sm' lineHeight={5}>
                {note.text}
            </Text>
        </CardBody>
    </Card>
);
