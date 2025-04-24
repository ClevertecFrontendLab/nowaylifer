import React, { useLayoutEffect } from 'react';

export const useWrappingSeperator = (containerRef: React.RefObject<HTMLElement | null>) => {
    useLayoutEffect(() => {
        if (!containerRef.current) return;

        let prevHeight: number | null = null;

        const observer = new ResizeObserver(([entry]) => {
            const height = entry.borderBoxSize?.[0].blockSize;
            if (height === prevHeight) return;
            prevHeight = height;

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

            for (const el of seperatorsToShow) {
                el.style.display = 'revert';
            }
        });

        observer.observe(containerRef.current);

        return () => {
            observer.disconnect();
        };
    }, [containerRef]);
};

const getTop = (el: Element) => Math.round(el.getBoundingClientRect().top);

const isWrapping = (el: Element) =>
    el.previousElementSibling && getTop(el) > getTop(el.previousElementSibling);
