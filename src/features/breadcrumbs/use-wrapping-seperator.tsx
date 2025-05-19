import { useResizeObserver } from '@react-hookz/web';
import { useRef } from 'react';

export const useWrappingSeperator = (offset = 8, enabled = true) => {
    const containerRef = useRef<HTMLElement>(null);
    const prevHeightRef = useRef<number>(undefined);

    useResizeObserver(
        containerRef,
        (entry) => {
            const height = entry.borderBoxSize?.[0].blockSize;
            if (height === prevHeightRef.current) return;
            prevHeightRef.current = height;

            const liElements = entry.target.firstElementChild!.children;
            const seperatorsToHide: HTMLElement[] = [];
            const seperatorsToShow: HTMLElement[] = [];

            for (const li of liElements) {
                if (isWrapping(li)) {
                    seperatorsToShow.push(li.firstElementChild as HTMLElement);
                } else {
                    seperatorsToHide.push(li.firstElementChild as HTMLElement);
                }
            }

            for (const el of seperatorsToHide) {
                el.style.display = 'none';
            }

            for (let i = 0; i < seperatorsToShow.length; i++) {
                seperatorsToShow[i].style.display = 'revert';
                seperatorsToShow[i].style.marginLeft = `${i * offset}px`;
            }
        },
        enabled,
    );

    return { containerRef };
};

const isWrapping = (el: Element) =>
    el.previousElementSibling && getTop(el) > getTop(el.previousElementSibling);

const getTop = (el: Element) => Math.round(el.getBoundingClientRect().top);
