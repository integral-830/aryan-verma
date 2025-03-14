import {Iphone15Pro} from "./Iphone15Pro.tsx";
import TiltEffect from "../utils/TiltEffect.tsx";
import {motion} from "framer-motion";
import {Circle} from "lucide-react";
import {SparklesText} from "./SparklesText.tsx";
import Globe from "./Globe.tsx";
import {cn} from "../utils/utils.ts";
import ShinyText from "./ShinyText.tsx";

const Hero = () => {

    const fadeUpVariants = {
        hidden: {opacity: 0, y: 30},
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative h-lvh w-full flex">
            <div className="flex flex-col w-full px-8">
                <div
                    className="relative z-[2] px-4 md:px-6 w-full h-full flex items-center justify-center lg:justify-start">
                    <div className="text-center">
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                        >
                            <Circle className="h-2 w-2 fill-rose-500/80"/>
                            <ShinyText text="Motion That Moves You !" disabled={false} speed={3}
                                       className='custom-class'/>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="text-2xl sm:text-6xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">
                                <SparklesText text="RENDER"
                                              className="text-[5vh] md:text-[8vh] lg:text-[10vh] text-white"/>
                                <div className="flex h-fit justify-center items-center">
                                    <SparklesText text="M"
                                                  className="text-[5vh] md:text-[8vh] lg:text-[10vh] text-white"/>
                                    <Globe className="top-28"/>
                                    <SparklesText text="TION"
                                                  className="text-[5vh] md:text-[8vh] lg:text-[10vh] text-white"/>
                                </div>
                                <br/>
                                <span
                                    className={cn(
                                        "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                                    )}
                                >
                                Every Frame Tells a Story
                            </span>
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </div>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -150,
                    rotate: -15,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                }}
                transition={{
                    duration: 2.4,
                    delay: 0.5,
                    ease: [0.23, 0.86, 0.39, 0.96],
                    opacity: {duration: 1.2},
                }}
                className="hidden lg:flex flex-col w-2/5 h-full p-20"
            >
                <TiltEffect className="w-full h-full">
                    <Iphone15Pro
                        className="size-full"
                        videoSrc="https://pub-c94b02dd33c14b448990be89eff7f07f.r2.dev/bgVideo2.mp4"
                    />
                </TiltEffect>
            </motion.div>
        </div>
    )
}
export default Hero
