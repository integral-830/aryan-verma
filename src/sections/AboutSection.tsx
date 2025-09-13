import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useEffect, useRef} from "react";
import {splitEnterScroll} from "../components/splitEnter.tsx";
import TextSection from "./TextSection.tsx";
import ImageReveal from "../components/ImageReveal.tsx";
import pp3 from "../../public/pp3.jpg"
import pp from "../../public/pp.jpg"

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const headingRef = useRef<HTMLHeadingElement>(null!);
    const aboutContainer1 = useRef<HTMLDivElement>(null!);
    const aboutContainer2 = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        const cleanup = splitEnterScroll([headingRef]);
        return cleanup;
    }, []);

    return (
        <section id="about" className="relative w-screen min-h-lvh">
            <div className="relative w-full h-full flex flex-col justify-center items-center lg:px-20">
                <div ref={headingRef} className="relative">
                    <h1 className="relative overflow-hidden text-[5rem] md:text-[8rem] xl:text-[12rem] text-black font-sofia_bold">
                        ABOUT ME
                    </h1>
                </div>

                <TextSection />

                <div className="w-full h-full flex flex-col justify-center items-center">
                    <div className="w-full lg:w-2/3 h-full items-center justify-center flex flex-col text-black/[0.5] p-10">
                        <div
                            ref={aboutContainer1}
                            className="flex flex-col lg:flex-row rounded-2xl p-2 items-center"
                        >
                            <div className="h-full flex flex-col justify-center items-start p-8">
                                <ImageReveal
                                    src={pp}
                                    alt="Poster"
                                    className="w-[200px] aspect-square m-4 object-cover"
                                    scrollRef={aboutContainer1}
                                />
                                <h2 className="font-sofia_semibold text-3xl text-center w-full">
                                    ARYAN VERMA
                                </h2>
                            </div>
                            <div className="w-full h-full flex flex-col justify-end items-start p-8">
                                <p className="font-spline_regular text-sm">
                                    Creative and detail-oriented Video Editor with expertise in
                                    Adobe After Effects and Premiere Pro, blending technical
                                    precision with artistic storytelling. Adapt at delivering
                                    high-quality videos under deadlines while ensuring brand
                                    consistency and audience engagement.
                                </p>
                            </div>
                        </div>

                        <div
                            ref={aboutContainer2}
                            className="flex flex-col-reverse lg:flex-row rounded-2xl p-2 items-center"
                        >
                            <div className="w-full h-full flex flex-col justify-end items-start p-8">
                                <p className="font-spline_regular text-sm">
                                    Editing for me is more than cutting clips — it’s about
                                    weaving moments into a story. I believe a good edit isn’t
                                    just about transitions and effects, but about the emotions it
                                    captures and the memories it brings to life.
                                </p>
                            </div>
                            <div className="h-full flex flex-col justify-center items-start p-8">
                                <ImageReveal
                                    src={pp3}
                                    alt="Poster"
                                    className="w-[200px] aspect-square object-cover m-4"
                                    scrollRef={aboutContainer2}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;