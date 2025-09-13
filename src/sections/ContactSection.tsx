import {useEffect, useRef} from "react";
import {splitEnterScroll, splitEnterScrollReverse} from "../components/splitEnter.tsx";
import gsap from "gsap";
import {SplitText} from "gsap/SplitText";

const ContactSection = () => {
    const headingRef = useRef<HTMLHeadingElement>(null!);
    const nameRef = useRef<HTMLHeadingElement>(null!);
    const headingRef2 = useRef<HTMLHeadingElement>(null!);

    useEffect(() => {
        gsap.registerPlugin(SplitText);
        const initSplitText = () => {
            const menuLinks = document.querySelectorAll(".menu-bottom a");
            menuLinks.forEach((link) => {
                const spans = link.querySelectorAll("span");
                if (spans.length < 2) return;
                const visibleSplit = new SplitText(spans[0], {type: "chars"});
                const hiddenSplit = new SplitText(spans[1], {type: "chars"});
                [...visibleSplit.chars, ...hiddenSplit.chars].forEach((char) => {
                    char.classList.add("relative", "inline-block", "will-change-transform", "font-spline_regular",);
                });
                gsap.set(hiddenSplit.chars, {y: "110%"});
                link.addEventListener("mouseenter", () => {
                    if (window.innerWidth < 1000) return;
                    gsap.to(visibleSplit.chars, {y: "-110%", stagger: 0.05, duration: 0.8, ease: "expo.inOut",});
                    gsap.to(hiddenSplit.chars, {y: "0%", stagger: 0.05, duration: 0.8, ease: "expo.inOut",});
                });
                link.addEventListener("mouseleave", () => {
                    if (window.innerWidth < 1000) return;
                    gsap.to(hiddenSplit.chars, {y: "110%", stagger: 0.05, duration: 0.8, ease: "expo.inOut",});
                    gsap.to(visibleSplit.chars, {y: "0%", stagger: 0.05, duration: 0.8, ease: "expo.inOut",});
                });
            });
        };
        if ("fonts" in document && "ready" in (document as any).fonts) {
            (document as any).fonts.ready.then(initSplitText);
        } else {
            setTimeout(initSplitText, 300);
        }
        const cleanup = splitEnterScroll([headingRef, headingRef2]);
        const cleanup2 = splitEnterScrollReverse([nameRef]);
        return () => {
            cleanup?.();
            cleanup2?.();
        };
    }, []);


    return (
        <section id="contact" className="relative w-screen min-h-lvh">
            <h2 className="text-center w-full text-sm md:text-[2rem] font-sofia_semibold uppercase text-black">
                Let’s start the conversation
            </h2>

            {/* Heading */}
            <div ref={headingRef} className="relative w-full flex items-center justify-center">
                <h1 className="relative overflow-hidden text-4xl md:text-[4.5rem] lg:text-[7rem] text-black font-sofia_bold">
                    GREAT EDIT'S
                </h1>
            </div>

            <h2 className="text-center w-full text-[1rem] md:text-[2rem] font-sofia_semibold uppercase text-black">
                STARTS WITH
            </h2>

            <div ref={headingRef2} className="relative w-full flex items-center justify-center">
                <h1 className="relative overflow-hidden text-4xl md:text-[4.5rem] lg:text-[7rem] text-black font-sofia_bold">
                    GREAT COLLABORATION
                </h1>
            </div>

            {/* Contact Info */}
            <h2 className="w-full text-end pt-40 px-4 text-[2rem] md:text-[3rem] xl:text-[3rem] font-sofia_semibold text-black">
                +91 91424 46097
            </h2>
            <h2 className="w-full text-end px-4 -mt-4 text-[2rem] md:text-[3rem] xl:text-[3rem] font-sofia_semibold text-black">
                aryanakku1810@gmail.com
            </h2>

            {/* Social Links */}
            <div className="flex w-full justify-around h-[100px]">
                {/* LinkedIn */}
                <div className="flex items-center w-full justify-center">
                    <div
                        className="flex items-center gap-2 hover:gap-4 will-change-transform duration-100 justify-center">
                        <h1 className="text-xl text-black mix-blend-difference ss01 font-sofia_semibold">[</h1>
                        <div
                            className="menu-bottom flex relative will-change-transform overflow-hidden text-black text-sm">
                            <a className="relative overflow-hidden block leading-none cursor-pointer">
                                <span>LINKED IN</span>
                                <span className="absolute inset-0">LINKED IN</span>
                            </a>
                        </div>
                        <h1 className="text-xl text-black mix-blend-difference ss01 font-sofia_semibold">]</h1>
                    </div>
                </div>

                {/* Instagram */}
                <div className="flex items-center w-full justify-center">
                    <div
                        className="flex items-center gap-2 hover:gap-4 will-change-transform duration-100 justify-center">
                        <h1 className="text-xl text-black mix-blend-difference ss01 font-sofia_semibold">[</h1>
                        <div
                            className="menu-bottom flex relative will-change-transform overflow-hidden text-black text-sm">
                            <a className="relative overflow-hidden block leading-none cursor-pointer mix-blend-difference">
                                <span>INSTAGRAM</span>
                                <span className="absolute inset-0">INSTAGRAM</span>
                            </a>
                        </div>
                        <h1 className="text-xl text-black mix-blend-difference ss01 font-sofia_semibold">]</h1>
                    </div>
                </div>

                {/* YouTube */}
                <div className="flex items-center w-full justify-center">
                    <div
                        className="flex items-center gap-2 hover:gap-4 will-change-transform duration-100 justify-center">
                        <h1 className="text-xl text-black mix-blend-difference ss01 font-sofia_semibold">[</h1>
                        <div
                            className="menu-bottom flex relative will-change-transform overflow-hidden text-black text-sm">
                            <a className="relative overflow-hidden block leading-none cursor-pointer">
                                <span>YOUTUBE</span>
                                <span className="absolute inset-0">YOUTUBE</span>
                            </a>
                        </div>
                        <h1 className="text-xl text-black mix-blend-difference ss01 font-sofia_semibold">]</h1>
                    </div>
                </div>
            </div>

            {/* Name */}
            <div ref={nameRef} className="relative w-full flex items-center justify-center">
                <h1 className="relative overflow-hidden text-5xl md:text-[7rem] lg:text-[12rem] text-black font-sofia_bold">
                    ARYAN VERMA
                </h1>
            </div>

            {/* Footer */}
            <div className="relative w-full flex flex-col lg:flex-row items-center p-4 gap-4 justify-center">
                <h1 className="relative overflow-hidden text-center text-[0.7rem] md:text-sm font-spline_regular text-gray-500">
                    Developer - integral0830
                </h1>
                <h1 className="relative overflow-hidden text-[0.7rem] md:text-sm font-spline_regular text-gray-500">
                    Jharkhand, India (GMT+5:30)
                </h1>
                <h1 className="relative overflow-hidden text-[0.7rem] md:text-sm font-spline_regular text-gray-500">
                    © All rights reserved. 2025
                </h1>
            </div>
        </section>
    );
};

export default ContactSection;