export interface ScrollTabIntoViewInput {
    scrollable: HTMLElement;
    tab: HTMLElement;
    offset?: number;
    behavior?: ScrollBehavior;
}

export const scrollTabIntoView = ({
    scrollable,
    tab: target,
    offset = 0,
    behavior = 'auto',
}: ScrollTabIntoViewInput) => {
    if (offset < 0) {
        throw new Error('Offset must not be negative');
    }
    const distanceToLeftEdge = target.offsetLeft - scrollable.scrollLeft;
    const distanceToRightEdge = getOffsetRight(target, scrollable) - getScrollRight(scrollable);

    let scrollBy = 0;

    if (distanceToRightEdge < distanceToLeftEdge && distanceToRightEdge < offset) {
        const distanceToCenter = getDistanceToCenter('right', scrollable, target);
        scrollBy = Math.min(
            Math.max(Math.abs(offset - distanceToRightEdge), offset),
            distanceToCenter,
        );
    } else if (distanceToLeftEdge < distanceToRightEdge && distanceToLeftEdge < offset) {
        const distanceToCenter = getDistanceToCenter('left', scrollable, target);
        scrollBy = Math.max(Math.min(distanceToLeftEdge - offset, -offset), -distanceToCenter);
    }

    scrollable.scrollBy({ left: scrollBy, behavior });
};

const getDistanceToCenter = (
    nearestEdge: 'right' | 'left',
    scrollable: HTMLElement,
    target: HTMLElement,
) => {
    const scrollOffset =
        nearestEdge === 'right' ? getScrollRight(scrollable) : scrollable.scrollLeft;
    const targetOffset =
        nearestEdge === 'right' ? getOffsetRight(target, scrollable) : target.offsetLeft;
    const scrollCenterOffset = scrollOffset + scrollable.clientWidth / 2;
    const targetCenterOffset = targetOffset + target.offsetWidth / 2;
    return scrollCenterOffset - targetCenterOffset;
};

const getScrollRight = (element: Element) =>
    element.scrollWidth - (element.scrollLeft + element.clientWidth);

const getOffsetRight = (element: HTMLElement, scrollable: Element) =>
    scrollable.scrollWidth - (element.offsetLeft + element.offsetWidth);
