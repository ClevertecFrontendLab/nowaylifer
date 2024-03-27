import { MutableRefObject } from 'react';

export const fixTextWrapWidth = (ref: MutableRefObject<HTMLElement>) => {
    const el = ref.current;
    const text = el.childNodes[0];
    const range = document.createRange();

    range.setStartBefore(text);
    range.setEndAfter(text);

    const clientRect = range.getBoundingClientRect();

    el.style.width = `${clientRect.width}px`;
};
