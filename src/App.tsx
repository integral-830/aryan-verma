import LandingSection from "./sections/LandingSection.tsx";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import AboutSection from "./sections/AboutSection.tsx";
import Navbar from "./components/Navbar.tsx";
import ExperienceSection from "./sections/ExperienceSection.tsx";
import Editor from "./components/Editor.tsx";
import ContactSection from "./sections/ContactSection.tsx";
import WorkSection from "./sections/WorkSection.tsx";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

function useIsLargeScreen() {
    const [isLarge, setIsLarge] = useState(() => window.innerWidth >= 1024);
    const [width, setWidth] = useState(() => window.innerWidth);

    useEffect(() => {
        const onResize = () => {
            setIsLarge(window.innerWidth >= 1024);
            setWidth(window.innerWidth); // track width for remount
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return { isLarge, width };
}

function App() {
    const { isLarge, width } = useIsLargeScreen();

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => 1 - Math.pow(1 - t, 3),
            smoothWheel: true,
        });

        lenis.on("scroll", ScrollTrigger.update);

        const raf = (time: number) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(raf);
        };
    }, []);

    return (
        <div key={width} className="relative w-screen min-h-lvh bg-[#F7F7F7]">
            <Navbar />
            <LandingSection />
            {isLarge && <Editor />} {/* Only render on large screens */}
            <AboutSection />
            <WorkSection />
            <ExperienceSection />
            <ContactSection />
        </div>
    );
}

export default App;