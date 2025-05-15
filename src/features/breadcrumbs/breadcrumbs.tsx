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
    wrappingSeperatorOffset?: number;
    wrap?: boolean;
}

export const Breadcrumbs = ({
    onBreadcrumbClick,
    wrap = true,
    wrappingSeperatorOffset = 8,
    ...props
}: BreadcrumbsProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeCategories = useActiveCategories();
    const breadcrumbs = useBreadcrumbs(activeCategories);

    useWrappingSeperator(containerRef, wrappingSeperatorOffset, wrap);

    return (
        <Breadcrumb
            ref={containerRef}
            separator={<BreadcrumbSeparator />}
            listProps={wrap ? { flexWrap: 'wrap', rowGap: 1 } : undefined}
            spacing={0}
            data-test-id={TestId.BREADCRUMBS}
            {...props}
        >
            {breadcrumbs.map((breadcrumb, idx) => (
                <BreadcrumbItem
                    key={idx + breadcrumb.label}
                    isCurrentPage={idx === breadcrumbs.length - 1}
                >
                    <chakra.span role='presentation' display='none'>
                        <BreadcrumbSeparator />
                    </chakra.span>
                    <BreadcrumbLink
                        as={ReactRouterLink}
                        to={breadcrumb.href}
                        color='blackAlpha.700'
                        _activeLink={{ color: 'black' }}
                        onClick={() =>
                            onBreadcrumbClick?.(breadcrumb, idx === breadcrumbs.length - 1)
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
