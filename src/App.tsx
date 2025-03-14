import LandingSection from "./sections/LandingSection.tsx";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";
import {useEffect} from "react";
import Lenis from "lenis";
import {HeroGeometric} from "./components/HeroGeometric.tsx";

function App() {

    useEffect(() => {
        const lenis = new Lenis();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
        function updateTime(time: number) {
            lenis.raf(time);
            requestAnimationFrame(updateTime)
        }
        requestAnimationFrame(updateTime);
    })

    return (
        <div className="relative w-screen min-h-lvh">
            <HeroGeometric/>
            <LandingSection />
        </div>
    )
}

export default App
