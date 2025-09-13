import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import {useEffect} from "react";

const Navbar = () => {
    useEffect(() => {
        gsap.registerPlugin(SplitText);
        gsap.registerPlugin(ScrollToPlugin);

        const initSplitText = () => {
            const menuLinks = document.querySelectorAll(".menu-link a");
            menuLinks.forEach((link) => {
                const spans = link.querySelectorAll("span");
                if (spans.length < 2) return;
                const visibleSplit = new SplitText(spans[0], {type: "chars"});
                const hiddenSplit = new SplitText(spans[1], {type: "chars"});
                [...visibleSplit.chars, ...hiddenSplit.chars].forEach((char) => {
                    char.classList.add("relative", "inline-block", "will-change-transform", "font-sofia_bold",);
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

        const links = document.querySelectorAll("a[data-scroll]");
        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const target = link.getAttribute("href");
                if (!target) return;

                gsap.to(window, {
                    duration: 1.2,
                    scrollTo: {
                        y: target,  // scroll to section ID
                        offsetY: 80 // adjust for fixed navbar height
                    },
                    ease: "expo.inOut"
                });
            });
        });

        if ("fonts" in document && "ready" in (document as any).fonts) {
            (document as any).fonts.ready.then(initSplitText);
        } else {
            setTimeout(initSplitText, 300);
        }
    }, []);

    return (
        <div
            className="w-full h-[60px] md:h-[100px] navbar bg-black mix-blend-difference px-4 md:p-10 fixed top-0 left-0 z-[100] flex justify-start items-center">
            <div className="flex flex-col items-center md:mx-20">
                <a href="#home" data-scroll className="text-xl md:text-3xl text-[#F7F7F7] mix-blend-difference  font-sofia_bold">
                    ARYAN
                </a>
                <h1 className="text-xl md:text-3xl text-[#F7F7F7] mix-blend-difference -my-3 ss01 font-sofia_semibold">
                    VERMA
                </h1>
            </div>

            <nav className="hidden md:flex w-full justify-around ml-10">
                <div className="flex items-center w-full justify-center">
                    <div className="flex items-center gap-2 hover:gap-4 will-change-transform duration-100  justify-center">
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">[</h1>
                        <div
                            className="menu-link flex relative will-change-transform overflow-hidden text-[#F7F7F7] text-sm">
                            <a href="#about" data-scroll className="relative overflow-hidden block leading-none cursor-pointer mix-blend-difference">
                                <span>ABOUT ME</span>
                                <span className="absolute inset-0">ABOUT ME</span>
                            </a>
                        </div>
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">]</h1>
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <div
                        className="flex items-center gap-2 hover:gap-4 will-change-transform duration-100  justify-center">
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">[</h1>
                        <div
                            className="menu-link flex relative will-change-transform overflow-hidden text-[#F7F7F7] text-sm">
                            <a href="#work" data-scroll className="relative overflow-hidden block leading-none cursor-pointer">
                                <span>WORKS</span>
                                <span className="absolute inset-0">WORKS</span>
                            </a>
                        </div>
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">]</h1>
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <div
                        className="flex items-center gap-2 hover:gap-4 will-change-transform duration-100  justify-center">
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">[</h1>
                        <div
                            className="menu-link flex relative will-change-transform overflow-hidden text-[#F7F7F7] text-sm">
                            <a href="#exp" data-scroll className="relative overflow-hidden block leading-none cursor-pointer">
                                <span>EXPERIENCE</span>
                                <span className="absolute inset-0">EXPERIENCE</span>
                            </a>
                        </div>
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">]</h1>
                    </div>
                </div>
                <div className="flex items-center w-full justify-center">
                    <div
                        className="flex items-center gap-2 hover:gap-4 will-change-transform duration-100  justify-center">
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">[</h1>
                        <div
                            className="menu-link flex relative will-change-transform overflow-hidden text-[#F7F7F7] text-sm">
                            <a href="#contact" data-scroll className="relative overflow-hidden block leading-none cursor-pointer">
                                <span>CONNECT</span>
                                <span className="absolute inset-0">CONNECT</span>
                            </a>
                        </div>
                        <h1 className="text-xl text-[#F7F7F7] mix-blend-difference ss01 font-sofia_semibold">]</h1>
                    </div>
                </div>

            </nav>
        </div>
    );
};

export default Navbar;