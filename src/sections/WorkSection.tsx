import {useEffect, useRef, useState} from "react";
import {motion} from "motion/react";
import {splitEnterScroll} from "../components/splitEnter.tsx";

const WorkSection = () => {

    const [width, setWidth] = useState(0);
    const carouselRef = useRef<HTMLDivElement>(null!);
    const headingRef2 = useRef<HTMLDivElement>(null!);

    const items: string[] = [
        "https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/ov1.mp4",
        "https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/ov3.mp4",
        "https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/v4.mp4",
        "https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/ov1.mp4",
        "https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/ov3.mp4",
        "https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/v4.mp4",
    ]

    useEffect(() => {
        const cleanup = splitEnterScroll([headingRef2]);
        if (carouselRef.current) {
            setWidth(
                carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
            );
        }
        return cleanup;
    },[]);

    return (
        <section id="work" className="relative w-full overflow-hidden my-16">
            <div ref={headingRef2} className="relative w-full flex items-center justify-center">
                <h1 className="relative overflow-hidden text-5xl md:text-[8rem] xl:text-[12rem] text-black font-sofia_bold">
                    WORKS
                </h1>
            </div>
            <motion.div
                ref={carouselRef}
                drag="x"
                whileDrag={{ scale: 0.95 }}
                dragElastic={0.2}
                dragConstraints={{ right: 0, left: -width }}
                dragTransition={{ bounceDamping: 30 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex will-change-transform cursor-grab active:cursor-grabbing"
            >
                {items.slice(0, 8).map((item,index) => (
                    <motion.div
                        key={index}
                        className="mx-16"
                    >
                        <video
                            src={item}
                            muted={true}
                            loop={true}
                            autoPlay={true}
                            width={400}
                            height={400}
                            className="max-w-[200px] aspect-auto  pointer-events-auto rounded-md  grayscale hover:grayscale-0
                                       transition duration-300 ease-in-out"
                        />
                    </motion.div>
                ))}
            </motion.div>
            <h1 className="relative w-full p-8 overflow-hidden text-sm font-spline_regular text-gray-500 text-center">
                Swipe to see more...
            </h1>
        </section>
    );
};

export default WorkSection;