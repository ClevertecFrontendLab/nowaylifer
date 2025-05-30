import { Avatar, Box, BoxProps, Circle, HStack, Square } from '@chakra-ui/react';
import { memo } from 'react';

import userAvatarUrl from '~/shared/assets/user.png';
import { TestId } from '~/shared/test-ids';
import { Button } from '~/shared/ui/button';
import { HomeIcon } from '~/shared/ui/icons/home';
import { PencilIcon } from '~/shared/ui/icons/pencil';
import { SearchIcon } from '~/shared/ui/icons/search';

export const BottomMenu = memo((props: BoxProps) => (
    <Box
        bg='lime.50'
        height='84px'
        data-test-id={TestId.FOOTER}
        sx={{ position: 'static !important;' }}
        {...props}
    >
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
                        <PencilIcon boxSize={6} color='blackAlpha.900' />
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
                topIcon={<Avatar boxSize={10} src={userAvatarUrl} />}
            >
                Мой профиль
            </Button>
        </HStack>
    </Box>
));
