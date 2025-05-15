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
    if (scrollWidth <= containerWidth) {
        return;
    }

    const { offsetLeft: tabOffsetLeft, offsetWidth: tabOffsetWidth } = tab;
    const newLeft = tabOffsetLeft - containerWidth / 2 + tabOffsetWidth / 2;

    if (Math.abs(newLeft - scrollLeft) < scrollThreshold) {
        return;
    }

    let path = newLeft - scrollLeft;

    if (path < 0) {
        const remainingPath = -scrollLeft;
        path = Math.max(path, remainingPath);
    } else if (path > 0) {
        const remainingPath = scrollWidth - (scrollLeft + containerWidth);
        path = Math.min(path, remainingPath);
    }

    if (path === 0) {
        return;
    }

    container.scrollTo({ left: scrollLeft + path, behavior });
};
