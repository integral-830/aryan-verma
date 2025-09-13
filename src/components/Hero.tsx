import {useEffect, useState} from "react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";

const Hero = () => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    useEffect(() => {
        (document as any).fonts?.ready.then(() => {
            setAssetsLoaded(true);
        });
    }, []);

    useGSAP(() => {
        if (!assetsLoaded) return;

        function animateProgress(duration = 4) {
            const timeline = gsap.timeline();
            const counterSteps = 5;
            let currentProgress = 0;

            for (let i = 0; i < counterSteps; i++) {
                const finalStep = i === counterSteps - 1;
                const targetProgress = finalStep ? 1 : Math.min(currentProgress + Math.random() * 0.3 + 0.1, 0.9);
                currentProgress += targetProgress;

                timeline.to(".preloader-progress-bar", {
                    scaleX: targetProgress,
                    duration: duration / counterSteps,
                    ease: "power2.out",
                });
            }

            return timeline;
        }

        const timeline = gsap.timeline({delay: 0.5});
        timeline
            .add(animateProgress(), "<")
            .set(".preloader-progress", {backgroundColor: "#F7F7F7"})
            .to(".preloader-progress", {opacity: 0, duration: 0.5, ease: "power3.out"}, "-=0.25")
            .set(".preloader-progress", {backgroundColor: "transparent"})
            .to(".preloader-mask", {scale: 15, duration: 3, ease: "power3.out"}, "<");

        const init = (el: HTMLElement) => {
            const split = new SplitText(el, {type: "chars"});

            split.chars.forEach((c) => {
                const el = c as HTMLElement;
                el.classList.add("relative", "inline-block", "will-change-transform");
                el.style.overflow = "visible";
            });


            gsap.set(split.chars, {yPercent: -30, opacity: 0});
            gsap.set(".navbar", {yPercent: -100, opacity: 0});
            gsap.set(".htext", {yPercent: 100, opacity: 0});
            gsap.set(".bgimg", {yPercent: -100, opacity: 0});

            timeline.to([".navbar", ".htext", ".bgimg"], {
                yPercent: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power2.out"
            }, "<");
            timeline.to(
                split.chars,
                {yPercent: 0, opacity: 1, duration: 0.8, ease: "power4.out", stagger: {amount: 0.8, from: "center"}},
                "<"
            );

            return () => split.revert();
        };

        const cleanups: (() => void)[] = [];
        const run = () => {
            const elements = document.querySelectorAll<HTMLElement>(".header a");
            elements.forEach((el) => {
                const cleanup = init(el);
                if (cleanup) cleanups.push(cleanup);
            });
        };

        run(); // Run animation once fonts are loaded
        return () => cleanups.forEach((fn) => fn());
    }, [assetsLoaded]);

    return (
        <>
            <div
                className="preloader-progress fixed top-0 left-0 w-screen h-lvh pointer-events-none bg-black z-[1000] will-change-[opacity]">
                <div
                    className="preloader-progress-bar absolute top-0 left-1/2 translate-x-[-50%] scale-x-0 w-1/2 h-full bg-[#F7F7F7] origin-left will-change-transform"></div>
                <div
                    className="preloader-logo absolute top-1/2 left-1/2 -translate-1/2 w-full text-center mix-blend-difference z-[2000]">
                    <div className="flex flex-col items-center mx-20">
                        <h1 className="text-5xl text-[#F7F7F7] mix-blend-difference font-sofia_bold">ARYAN</h1>
                        <h1 className="text-3xl text-[#F7F7F7] mix-blend-difference -my-3 ss01 font-sofia_semibold">VERMA</h1>
                    </div>
                </div>
            </div>
            <div
                className="preloader-mask fixed top-0 left-0 w-screen bg-black h-lvh pointer-events-none
        [-webkit-mask:linear-gradient(to_right,black,black),url('src/assets/capsule.svg')_center/50%_no-repeat]
        will-change-transform z-[1000]
        [mask-composite:subtract] [-webkit-mask-composite:destination-out]"
            ></div>
            <div className="relative h-lvh w-full flex">
                <div className="relative w-full h-full flex flex-col items-center pt-[60px] md:pt-[100px] justify-center">
                    <div className="relative header">
                        <a className="relative overflow-hidden block text-black font-sofia_bold">
                            <div className="flex flex-col lg:flex-row lg:gap-x-8 items-center justify-center leading-none">
                                <span className="text-[7rem] xl:text-[12rem] tracking-tighter">VIDEO </span>
                                <span className="text-[7rem] xl:text-[12rem] tracking-tighter">EDITOR</span>
                            </div>
                        </a>
                    </div>

                    <h4 className="htext text-center w-full text-[1rem] tracking-[0.7rem] md:text-[1.5rem] font-sofia_semibold -m-4">
                        BASED IN INDIA
                    </h4>
                    <div className="flex w-full h-full justify-center items-center pb-16">
                        <div className="flex flex-col items-end text-xl md:text-3xl justify-end w-full h-full md:py-12">
                            <h1 className="htext text-black font-sofia_semibold">/story-in-motion</h1>
                            <h1 className="htext text-black font-sofia_semibold">/crafted-cuts</h1>
                            <h4 className="htext text-black font-sofia_semibold leading-relaxed">/beyond-the-frame</h4>
                        </div>
                        <div className="relative overflow-hidden flex items-end w-full h-full">
                            <img src="/src/assets/pp2.jpg" className="h-[180px] md:h-[300px] aspect-[3/4] bg-cover bgimg"
                                 alt="profile_picture"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hero;