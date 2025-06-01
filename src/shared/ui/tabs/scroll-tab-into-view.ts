export interface ScrollTabIntoViewOptions {
    container: HTMLElement;
    tab: HTMLElement;
    scrollThreshold?: number;
    behavior?: ScrollBehavior;
}

export const scrollTabIntoView = ({
    container,
    tab,
    scrollThreshold = 50,
    behavior = 'auto',
}: ScrollTabIntoViewOptions) => {
    const { scrollWidth, offsetWidth: containerWidth, scrollLeft } = container;
    if (scrollWidth <= containerWidth) return;

    const { offsetLeft: tabOffsetLeft, offsetWidth: tabOffsetWidth } = tab;
    const tabCenter = tabOffsetLeft + tabOffsetWidth / 2;
    const newLeft = tabCenter - containerWidth / 2;

    const path = newLeft - scrollLeft;

    if (Math.abs(path) < scrollThreshold) return;

    const target = Math.min(scrollWidth - containerWidth, Math.max(0, scrollLeft + path));

    container.scrollTo({ left: target, behavior });
};
