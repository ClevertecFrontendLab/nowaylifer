import { Avatar, Box, BoxProps, Circle, HStack, Icon, IconProps, Square } from '@chakra-ui/react';

import { Button } from '~/shared/ui/Button';
import { PenIcon } from '~/shared/ui/PenIcon';
import { SearchIcon } from '~/shared/ui/SearchIcon';

export const BottomMenu = (props: BoxProps) => (
    <Box bg='lime.50' height='84px' {...props}>
        <HStack h='full' justify='space-around' alignItems='center'>
            <Button
                variant='ghost'
                fontSize='xs'
                fontWeight='medium'
                iconSpacing={1}
                topIcon={
                    <Box pos='relative' zIndex={1}>
                        <Circle
                            size={10}
                            bg='black'
                            color='lime.50'
                            _before={{
                                content: '""',
                                pos: 'absolute',
                                inset: -2.5,
                                zIndex: -1,
                                bgGradient:
                                    'radial(50% 50% at center, rgba(var(--chakra-colors-lime-300-rgb), 0.7), transparent)',
                            }}
                        >
                            <HomeIcon boxSize={4} />
                        </Circle>
                    </Box>
                }
            >
                Главнaя
            </Button>
            <Button
                fontSize='xs'
                variant='ghost'
                iconSpacing={1}
                fontWeight='normal'
                color='blackAlpha.700'
                topIcon={
                    <Square bg='none' size={10}>
                        <SearchIcon boxSize={6} color='blackAlpha.900' />
                    </Square>
                }
            >
                Поиск
            </Button>
            <Button
                fontSize='xs'
                variant='ghost'
                iconSpacing={1}
                fontWeight='normal'
                color='blackAlpha.700'
                topIcon={
                    <Square bg='none' size={10}>
                        <PenIcon boxSize={6} color='blackAlpha.900' />
                    </Square>
                }
            >
                Записать
            </Button>
            <Button
                fontSize='xs'
                variant='ghost'
                iconSpacing={1}
                fontWeight='normal'
                color='blackAlpha.700'
                topIcon={<Avatar boxSize={10} src='/images/user.png' />}
            >
                Мой профиль
            </Button>
        </HStack>
    </Box>
);

const HomeIcon = (props: IconProps) => (
    <Icon viewBox='0 0 16 16' boxSize='1em' {...props}>
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M2 13.5V7H3V13.5C3 13.6326 3.05268 13.7598 3.14645 13.8536C3.24021 13.9473 3.36739 14 3.5 14H12.5C12.6326 14 12.7598 13.9473 12.8536 13.8536C12.9473 13.7598 13 13.6326 13 13.5V7H14V13.5C14 13.8978 13.842 14.2794 13.5607 14.5607C13.2794 14.842 12.8978 15 12.5 15H3.5C3.10218 15 2.72064 14.842 2.43934 14.5607C2.15804 14.2794 2 13.8978 2 13.5ZM13 2.5V6L11 4V2.5C11 2.36739 11.0527 2.24021 11.1464 2.14645C11.2402 2.05268 11.3674 2 11.5 2H12.5C12.6326 2 12.7598 2.05268 12.8536 2.14645C12.9473 2.24021 13 2.36739 13 2.5Z'
            fill='currentColor'
        />
        <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.29266 1.5C7.48018 1.31253 7.73449 1.20721 7.99966 1.20721C8.26482 1.20721 8.51913 1.31253 8.70665 1.5L15.3537 8.146C15.4475 8.23989 15.5003 8.36723 15.5003 8.5C15.5003 8.63278 15.4475 8.76011 15.3537 8.854C15.2598 8.94789 15.1324 9.00063 14.9997 9.00063C14.8669 9.00063 14.7395 8.94789 14.6457 8.854L7.99966 2.207L1.35365 8.854C1.25977 8.94789 1.13243 9.00063 0.999655 9.00063C0.866879 9.00063 0.739542 8.94789 0.645655 8.854C0.551768 8.76011 0.499023 8.63278 0.499023 8.5C0.499023 8.36723 0.551768 8.23989 0.645655 8.146L7.29266 1.5Z'
            fill='currentColor'
        />
    </Icon>
);
