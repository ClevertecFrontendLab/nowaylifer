import { Carousel as CarouselAntd, CarouselProps } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { forwardRef, useImperativeHandle, useRef } from 'react';

type CustomCarouselProps = CarouselProps & {
    onTransitionEnd?(currentSlide: number): void;
};

type InnerSlider = {
    list: HTMLDivElement;
    state: {
        currentSlide: number;
    };
};

export const Carousel = forwardRef<CarouselRef, CustomCarouselProps>(
    ({ onTransitionEnd, ...props }, ref) => {
        const carouselRef = useRef<CarouselRef>(null);

        const listenForTransitionEnd = () => {
            const slider = carouselRef.current?.innerSlider as InnerSlider;
            if (slider) {
                const slides = slider.list.querySelectorAll<HTMLDivElement>('.slick-slide');
                let endedTransitions = 0;

                const handleEnd = () => {
                    ++endedTransitions;
                    if (endedTransitions === slides.length) {
                        endedTransitions = 0;
                        onTransitionEnd?.(slider.state.currentSlide);
                    }
                };

                slides.forEach((el) =>
                    el.addEventListener('transitionend', handleEnd, { once: true }),
                );
            }
        };

        useImperativeHandle(
            ref,
            () =>
                ({
                    ...carouselRef.current,
                    goTo: (slide: number) => {
                        carouselRef.current?.goTo(slide);
                        listenForTransitionEnd();
                    },
                } as CarouselRef),
        );

        return <CarouselAntd ref={carouselRef} {...props} />;
    },
);
