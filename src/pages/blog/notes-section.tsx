import {
    BoxProps,
    Button,
    ButtonProps,
    Center,
    chakra,
    Heading,
    SimpleGrid,
    useDisclosure,
} from '@chakra-ui/react';

import { Note, NoteCard } from '~/entities/blog';
import { TestId } from '~/shared/test-ids';
import { Section } from '~/shared/ui/section';

export interface NotesSection extends BoxProps {
    notes: Note[];
    collapsedMaxCount?: number;
}

export const NotesSection = ({ notes, collapsedMaxCount = 3, ...props }: NotesSection) => {
    const { isOpen: isExpanded, onOpen: expand, onClose: collapse } = useDisclosure();
    const notesToShow = isExpanded ? notes : notes.slice(0, collapsedMaxCount);
    const notesToHide = isExpanded ? [] : notes.slice(collapsedMaxCount);
    const hasMoreNotes = notes.length > collapsedMaxCount;

    return (
        <Section
            bg='blackAlpha.50'
            borderRadius='2xl'
            p={{ base: 4, lg: 6 }}
            pb={4}
            data-test-id={TestId.BLOGGER_NOTES_SECTION}
            {...props}
        >
            <Heading
                id='notes'
                as='h2'
                fontWeight='normal'
                fontSize={{ base: 'xl', lg: '4xl' }}
                lineHeight={{ base: 7, lg: 10 }}
                mb={4}
            >
                Заметки{' '}
                <chakra.span
                    color='blackAlpha.600'
                    fontSize={{ base: 'xl', lg: '3xl' }}
                    lineHeight={{ base: 7, lg: 9 }}
                    data-test-id={TestId.BLOGGER_NOTES_COUNT}
                >
                    ({notes.length})
                </chakra.span>
            </Heading>
            <SimpleGrid
                autoRows='1fr'
                minChildWidth={{ base: '224px', lg: '267px', xl: '328px' }}
                spacing={{ base: 3, lg: 4 }}
                data-test-id={TestId.BLOGGER_NOTES_GRID}
            >
                {notesToShow.map((note, index) => (
                    <NoteCard key={index} note={note} />
                ))}
                {notesToHide.map((note, index) => (
                    <NoteCard display='none' key={index} note={note} />
                ))}
            </SimpleGrid>
            {hasMoreNotes && (
                <Center mt={4}>
                    {isExpanded ? (
                        <CollapseButton
                            onClick={collapse}
                            data-test-id={TestId.BLOGGER_NOTES_BUTTON}
                        />
                    ) : (
                        <ExpandButton onClick={expand} data-test-id={TestId.BLOGGER_NOTES_BUTTON} />
                    )}
                </Center>
            )}
        </Section>
    );
};

const CollapseButton = (props: ButtonProps) => (
    <Button size={{ base: 'xs', lg: 'sm' }} variant='ghost' {...props}>
        Свернуть
    </Button>
);

const ExpandButton = (props: ButtonProps) => (
    <Button size={{ base: 'xs', lg: 'sm' }} variant='ghost' {...props}>
        Показать больше
    </Button>
);
