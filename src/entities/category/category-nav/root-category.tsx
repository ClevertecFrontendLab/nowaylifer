import { AccordionButton, AccordionButtonProps, AccordionIcon, Box, Image } from '@chakra-ui/react';
import { memo } from 'react';

import { RootCategory } from '~/entities/category';
import { ChevronDownIcon } from '~/shared/ui/icons/chevron-down';

export interface RootCategoryItemProps extends AccordionButtonProps {
    rootCategory: RootCategory;
    isActive?: boolean;
}

export const RootCategoryItem = memo(
    ({ isActive, rootCategory, ...props }: RootCategoryItemProps) => (
        <AccordionButton
            _focusVisible={{ boxShadow: 'none', bg: isActive ? undefined : 'lime.100' }}
            _hover={isActive ? {} : { bg: 'lime.50' }}
            bg={isActive ? 'lime.100' : undefined}
            textAlign='start'
            py={3}
            px={2}
            {...props}
        >
            <Image src={rootCategory.icon} boxSize={6} mr={3} />
            <Box fontWeight={isActive ? 'bold' : 'medium'}>{rootCategory.title}</Box>
            <AccordionIcon as={ChevronDownIcon} w={4} h={4} ml='auto' />
        </AccordionButton>
    ),
);
