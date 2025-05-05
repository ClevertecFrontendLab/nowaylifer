import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps,
    chakra,
    IconProps,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { Link as ReactRouterLink } from 'react-router';

import { useActiveCategories } from '~/entities/category';
import { TestId } from '~/shared/test-ids';

import { BreadcrumbData } from './types';
import { useBreadcrumbs } from './use-breadcrumbs';
import { useWrappingSeperator } from './use-wrapping-seperator';

export interface BreadcrumbsProps extends BreadcrumbProps {
    onBreadcrumbClick?: (breadcrumb: BreadcrumbData, isActive: boolean) => void;
}

export const Breadcrumbs = ({ onBreadcrumbClick, ...props }: BreadcrumbsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeCategories = useActiveCategories();
    const breadcrumbs = useBreadcrumbs(activeCategories);

    useWrappingSeperator(containerRef);

    return (
        <Breadcrumb
            ref={containerRef}
            sx={{ '& > ol': { flexWrap: 'wrap', rowGap: 1 } }}
            separator={<BreadcrumbSeparator />}
            spacing={0}
            data-test-id={TestId.BREADCRUMBS}
            {...props}
        >
            {breadcrumbs.filter(Boolean).map((breadcrumb, i) => (
                <BreadcrumbItem key={breadcrumb.href} isCurrentPage={i === breadcrumbs.length - 1}>
                    <chakra.span role='presentation' display='none'>
                        <BreadcrumbSeparator />
                    </chakra.span>
                    <BreadcrumbLink
                        as={ReactRouterLink}
                        to={breadcrumb.href}
                        color='blackAlpha.700'
                        _activeLink={{ color: 'black' }}
                        onClick={() =>
                            onBreadcrumbClick?.(breadcrumb, i === breadcrumbs.length - 1)
                        }
                    >
                        {breadcrumb.label}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

const BreadcrumbSeparator = (props: IconProps) => (
    <ChevronRightIcon display='block' color='gray.800' w='22px' h={6} {...props} />
);
