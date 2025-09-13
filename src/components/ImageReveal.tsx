// components/ImageReveal.tsx
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageRevealProps {
    src: string;
    alt?: string;
    className?: string;
    scrollRef: React.RefObject<HTMLDivElement>;
}

export default function ImageReveal({ src, alt = "", className = "", scrollRef }: ImageRevealProps) {
    useEffect(() => {
        if (!scrollRef.current) return;

        const ctx = gsap.context(() => {
            const image = scrollRef.current!.querySelector("img");
            const overlay = scrollRef.current!.querySelector(".overlay");

            if (!image || !overlay) return;

            // Initial state
            gsap.set(image, { scale: 1.1, opacity: 0 });
            gsap.set(overlay, { yPercent: 0 });

            // Timeline reveal
            gsap.timeline({
                scrollTrigger: {
                    trigger: scrollRef.current,
                    start: "top 70%",
                    end: "bottom 30%",
                    scrub: 1,
                },
            })
                .to(overlay, { yPercent: -100, duration: 1.2, ease: "power4.inOut" })
                .to(
                    image,
                    { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" },
                    "-=1"
                );
        }, scrollRef);

        return () => ctx.revert();
    }, [scrollRef]);

    return (
        <div ref={scrollRef} className={`relative overflow-hidden ${className}`}>
            {/* Overlay */}
            <div className="overlay absolute inset-0 bg-white/90 backdrop-blur-sm z-10" />

            {/* Image */}
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
            />
        </div>
    );
}