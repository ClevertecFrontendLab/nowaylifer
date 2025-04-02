import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    BoxProps,
    Button,
    Icon,
    IconProps,
    Image,
    ListItem,
    UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';

import { foodMenu } from './food-menu';

export const FoodMenu = () => {
    const [active, setActive] = useState<[number, number] | []>([]);

    return (
        <Accordion allowMultiple>
            {foodMenu.map((item, sectionIdx) => {
                const sectionActive = active[0] === sectionIdx;
                return (
                    <AccordionItem key={sectionIdx} border='none'>
                        <AccordionButton
                            _hover={sectionActive ? {} : { bg: 'lime.50' }}
                            bg={sectionActive ? 'lime.100' : undefined}
                            py={3}
                            px={2}
                        >
                            <Image src={item.iconSrc} boxSize={6} mr={3} />
                            <Box fontWeight={sectionActive ? 'bold' : 'medium'}>{item.name}</Box>
                            <AccordionIcon as={ChevronDownIcon} w={4} h={4} ml='auto' />
                        </AccordionButton>
                        <AccordionPanel py={0}>
                            <UnorderedList styleType='none'>
                                {item.entries.map((entry, entryIdx) => {
                                    const entryActive = sectionActive && active[1] === entryIdx;

                                    return (
                                        <ListItem key={entryIdx}>
                                            <Button
                                                onClick={() => setActive([sectionIdx, entryIdx])}
                                                _hover={entryActive ? undefined : { bg: 'lime.50' }}
                                                variant='unstyled'
                                                textAlign='left'
                                                display='block'
                                                pos='relative'
                                                role='group'
                                                w='full'
                                                py={1.5}
                                                px={3}
                                            >
                                                <ListIcon
                                                    active={entryActive}
                                                    _groupHover={
                                                        entryActive
                                                            ? undefined
                                                            : { visibility: 'hidden' }
                                                    }
                                                />
                                                <Box fontWeight={entryActive ? 'bold' : 'medium'}>
                                                    {entry}
                                                </Box>
                                            </Button>
                                        </ListItem>
                                    );
                                })}
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};

const ListIcon = ({ active = false, ...rest }: { active?: boolean } & BoxProps) => (
    <Box
        pos='absolute'
        bg='lime.300'
        w={active ? 2 : 'px'}
        h={active ? 7 : 6}
        transform='translateY(-50%)'
        left={active ? '-7px' : 0}
        top='50%'
        {...rest}
    />
);

const ChevronDownIcon = (props: IconProps) => (
    <Icon viewBox='0 0 16 16' {...props}>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M1.64601 4.64601C1.69245 4.59945 1.74763 4.5625 1.80838 4.5373C1.86912 4.51209 1.93424 4.49911 2.00001 4.49911C2.06578 4.49911 2.1309 4.51209 2.19164 4.5373C2.25239 4.5625 2.30756 4.59945 2.35401 4.64601L8.00001 10.293L13.646 4.64601C13.6925 4.59952 13.7477 4.56264 13.8084 4.53749C13.8692 4.51233 13.9343 4.49938 14 4.49938C14.0658 4.49938 14.1309 4.51233 14.1916 4.53749C14.2523 4.56264 14.3075 4.59952 14.354 4.64601C14.4005 4.6925 14.4374 4.74769 14.4625 4.80842C14.4877 4.86916 14.5006 4.93426 14.5006 5.00001C14.5006 5.06575 14.4877 5.13085 14.4625 5.19159C14.4374 5.25233 14.4005 5.30752 14.354 5.35401L8.35401 11.354C8.30756 11.4006 8.25239 11.4375 8.19164 11.4627C8.1309 11.4879 8.06578 11.5009 8.00001 11.5009C7.93424 11.5009 7.86912 11.4879 7.80837 11.4627C7.74763 11.4375 7.69245 11.4006 7.64601 11.354L1.64601 5.35401C1.59945 5.30756 1.5625 5.25239 1.5373 5.19164C1.51209 5.1309 1.49911 5.06578 1.49911 5.00001C1.49911 4.93424 1.51209 4.86912 1.5373 4.80837C1.5625 4.74763 1.59945 4.69245 1.64601 4.64601Z'
            fill='currentColor'
        />
    </Icon>
);
