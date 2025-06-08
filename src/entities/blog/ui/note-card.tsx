import { Card, CardBody, CardProps, chakra, Text } from '@chakra-ui/react';
import { formatDate } from 'date-fns';
import { ru as ruLocale } from 'date-fns/locale';

import { TestId } from '~/shared/test-ids';

import { Note } from '../interface';

export interface NoteProps extends CardProps {
    note: Note;
}

export const NoteCard = ({ note, ...props }: NoteProps) => (
    <Card borderRadius='lg' {...props}>
        <CardBody p={6}>
            <chakra.time
                dateTime={note.date}
                fontSize='sm'
                lineHeight={5}
                display='block'
                color='lime.600'
                mb={4}
                data-test-id={TestId.NOTE_DATE}
            >
                {formatDate(note.date, 'dd MMMM yyyy', { locale: ruLocale })}
            </chakra.time>
            <Text fontSize='sm' lineHeight={5} data-test-id={TestId.NOTE_TEXT}>
                {note.text}
            </Text>
        </CardBody>
    </Card>
);
