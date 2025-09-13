import {Timeline} from "../components/Timeline.tsx";
import {useEffect, useRef} from "react";
import {splitEnterScroll} from "../components/splitEnter.tsx";

const ExperienceSection = () => {

    const data = [
        {
            title: "Jan2025-PRESENT",
            content: (
                <div className="flex flex-col lg:flex-row items-center rounded-2xl p-2">
                    <img src="/src/assets/freelance.png" alt="img" className="w-[100px] md:w-[150px] aspect-square rounded"/>
                    <div className="w-full h-full flex flex-col justify-center items-start p-8">
                        <h2 className="font-sofia_semibold text-xl md:text-3xl">Freelance Video Editor</h2>
                        <p className="font-spline_regular text-xs md:text-sm">Delivered engaging promotional, corporate, and social
                            media edits for a range of clients, enhancing brand storytelling and audience impact.</p>

                    </div>
                </div>
            ),
        },
        {
            title: "2023-2024",
            content: (
                <div className="flex flex-col lg:flex-row items-center rounded-2xl p-2">
                    <img src="/src/assets/youtube.svg" alt="img" className="w-[100px] md:w-[150px] aspect-square object-cover rounded"/>
                    <div className="w-full h-full flex flex-col justify-center items-start p-8">
                        <h2 className="font-sofia_semibold text-xl md:text-3xl">KD Production</h2>
                        <p className="font-spline_regular text-xs md:text-sm">Crafted and edited engaging video content tailored
                            for YouTube, enhancing storytelling techniques and boosting audience retention. Contributed
                            to building the channel’s visual identity and growth from the ground up.</p>

                    </div>
                </div>
            ),
        }
    ];

    const headingRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const cleanup = splitEnterScroll([headingRef]);
        return cleanup;
    }, []);

    return (
        <section id="exp" className="relative min-h-lvh">
            <div ref={headingRef} className="relative w-full flex items-center justify-center">
                <h1 className="relative overflow-hidden text-5xl md:text-[8rem] xl:text-[12rem] text-black font-sofia_bold">
                    EXPERIENCE
                </h1>
            </div>
            <Timeline data={data}/>
        </section>
    )
}
export default ExperienceSection
