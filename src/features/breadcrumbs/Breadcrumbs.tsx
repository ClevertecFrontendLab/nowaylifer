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

import { useBreadcrumbs } from '~/features/breadcrumbs/use-breadcrumbs';

import { BreadcrumbData } from './types';
import { useWrappingSeperator } from './use-wrapping-seperator';

export interface BreadcrumbsProps extends BreadcrumbProps {
    onBreadcrumbClick?: (breadcrumb: BreadcrumbData, isActive: boolean) => void;
}

export const Breadcrumbs = ({ onBreadcrumbClick, ...props }: BreadcrumbsProps) => {
    const breadcrumbs = useBreadcrumbs();
    const containerRef = useRef<HTMLDivElement>(null);

    useWrappingSeperator(containerRef);

    return (
        <Breadcrumb
            ref={containerRef}
            sx={{ '& > ol': { flexWrap: 'wrap', rowGap: 1 } }}
            separator={<BreadcrumbSeparator />}
            spacing={0}
            data-test-id='breadcrumbs'
            {...props}
        >
            {breadcrumbs.map((breadcrumb, i) => (
                <BreadcrumbItem key={breadcrumb.href} isCurrentPage={i === breadcrumbs.length - 1}>
                    <chakra.span role='presentation' display='none'>
                        <BreadcrumbSeparator />
                    </chakra.span>
                    <BreadcrumbLink
                        as={ReactRouterLink}
                        onClick={() =>
                            onBreadcrumbClick?.(breadcrumb, i === breadcrumbs.length - 1)
                        }
                        to={breadcrumb.href}
                        color='blackAlpha.700'
                        _activeLink={{ color: 'black' }}
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
