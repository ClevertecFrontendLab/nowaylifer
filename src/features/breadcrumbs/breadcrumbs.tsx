import { ChevronRightIcon } from '@chakra-ui/icons';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbProps,
    chakra,
    IconProps,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router';

import { useActiveCategories } from '~/entities/category';
import { TestId } from '~/shared/test-ids';

import { BreadcrumbData } from './types';
import { useBreadcrumbs } from './use-breadcrumbs';
import { useDetectWrap } from './use-detect-wrap';

export interface BreadcrumbsProps extends Omit<BreadcrumbProps, 'isTruncated'> {
    onBreadcrumbClick?: (breadcrumb: BreadcrumbData, isActive: boolean) => void;
    wrapSeparatorOffset?: number;
    wrap?: boolean;
}

export const Breadcrumbs = ({
    onBreadcrumbClick,
    wrap = false,
    wrapSeparatorOffset = 8,
    ...props
}: BreadcrumbsProps) => {
    const activeCategories = useActiveCategories();
    const breadcrumbs = useBreadcrumbs(activeCategories);
    const { containerRef, setItemRef, wrapInfo } = useDetectWrap([breadcrumbs], wrap);

    return (
        <Breadcrumb
            ref={containerRef}
            separator={<BreadcrumbSeparator />}
            listProps={{ w: 'full', ...(wrap && { flexWrap: 'wrap', rowGap: 1 }) }}
            spacing={0}
            data-test-id={TestId.BREADCRUMBS}
            {...props}
        >
            {breadcrumbs.map((breadcrumb, idx) => {
                const isCurrent = idx === breadcrumbs.length - 1;
                const { isWrapped, wrapOrder } = wrapInfo(idx);
                return (
                    <BreadcrumbItem
                        key={idx + breadcrumb.label}
                        isCurrentPage={isCurrent}
                        ref={setItemRef(idx)}
                        overflow='hidden'
                    >
                        {isWrapped && (
                            <chakra.span
                                role='presentation'
                                ml={`${wrapOrder * wrapSeparatorOffset}px`}
                            >
                                <BreadcrumbSeparator />
                            </chakra.span>
                        )}
                        <BreadcrumbLink
                            as={ReactRouterLink}
                            to={breadcrumb.href}
                            isTruncated={isWrapped}
                            color='blackAlpha.700'
                            _activeLink={{ color: 'black' }}
                            onClick={() => onBreadcrumbClick?.(breadcrumb, isCurrent)}
                        >
                            {breadcrumb.label}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                );
            })}
        </Breadcrumb>
    );
};

const BreadcrumbSeparator = (props: IconProps) => (
    <ChevronRightIcon display='block' color='gray.800' w='22px' h={6} {...props} />
);
