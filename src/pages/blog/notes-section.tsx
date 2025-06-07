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
import { Section } from '~/shared/ui/section';

export interface NotesSection extends BoxProps {
    notes: Note[];
    collapsedMaxCount?: number;
}

export const NotesSection = ({ notes, collapsedMaxCount = 3, ...props }: NotesSection) => {
    const { isOpen: isExpanded, onOpen: expand, onClose: collapse } = useDisclosure();
    const notesToShow = isExpanded ? notes : notes.slice(0, collapsedMaxCount);
    const hasMoreNotes = notes.length > collapsedMaxCount;

    return (
        <Section bg='blackAlpha.50' borderRadius='2xl' p={{ base: 4, lg: 6 }} pb={4} {...props}>
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
                >
                    ({notes.length})
                </chakra.span>
            </Heading>
            <SimpleGrid
                minChildWidth={{ base: '224px', lg: '267px', xl: '328px' }}
                autoRows='1fr'
                spacing={{ base: 3, lg: 4 }}
            >
                {notesToShow.map((note, index) => (
                    <NoteCard key={index} note={note} />
                ))}
            </SimpleGrid>
            {hasMoreNotes && (
                <Center mt={4}>
                    {isExpanded ? (
                        <CollapseButton onClick={collapse} />
                    ) : (
                        <ExpandButton onClick={expand} />
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
