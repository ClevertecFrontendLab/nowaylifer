import { Carousel, Drawer } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { CalendarCellPopover } from '../../calendar-cell-popover';
import { CreateTrainingCard, CreateTrainingCardProps } from '../create-training-card';
import { TrainingCard, TrainingCardProps } from '../training-card';
import styles from './training-popover.module.less';

type TrainingPopoverProps = TrainingCardProps & CreateTrainingCardProps;

export const TrainingPopover = ({ date, trainingTypes }: TrainingPopoverProps) => {
    const xss = useMediaQuery({ maxWidth: 480 });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const carouselRef = useRef<CarouselRef | null>(null);

    const handlePopoverOpenChange = (open: boolean) => {
        if (!open) setDrawerOpen(false);
        setPopoverOpen(open);
    };

    return (
        <CalendarCellPopover
            modal={xss}
            open={popoverOpen}
            onOpenChange={handlePopoverOpenChange}
            overlayClassName={styles.TrainingPopover}
            overlayStyle={{ width: xss ? 312 : 264 }}
            content={
                <>
                    <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} mask={false} />
                    <Carousel
                        className={styles.Carousel}
                        accessibility={false}
                        ref={carouselRef}
                        infinite={false}
                        easing='ease-in'
                        adaptiveHeight
                        swipe={false}
                        dots={false}
                        speed={200}
                    >
                        <TrainingCard
                            date={date}
                            onClose={() => handlePopoverOpenChange(false)}
                            onCreateTraining={() => carouselRef.current?.next()}
                        />
                        <CreateTrainingCard
                            trainingTypes={trainingTypes}
                            onCancel={() => carouselRef.current?.prev()}
                        />
                    </Carousel>
                </>
            }
        />
    );
};
