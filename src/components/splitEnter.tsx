import gsap from "gsap";
import {SplitText} from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export function splitEnter(selector: string) {
    const init = (el: HTMLElement) => {
        // split into characters
        const split = new SplitText(el, {type: "chars"});

        split.chars.forEach((c) => {
                const el = c as HTMLElement;
                el.classList.add("relative", "inline-block", "will-change-transform");
                el.style.overflow = "visible";
                el.style.lineHeight = "1.2";
            }
        );

        gsap.set(split.chars, {yPercent: 10, opacity: 0});

        gsap.to(split.chars, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            stagger: {
                amount: 0.8,
                from: "center",
            },
        });

        return () => {
            split.revert();
        };
    };

    const cleanups: (() => void)[] = [];

    const run = () => {
        const elements = document.querySelectorAll<HTMLElement>(selector);
        elements.forEach((el) => {
            const cleanup = init(el);
            if (cleanup) cleanups.push(cleanup);
        });
    };

    if ("fonts" in document && "ready" in (document as any).fonts) {
        (document as any).fonts.ready.then(run);
    } else {
        run();
    }

    return () => cleanups.forEach((fn) => fn());
}

export function splitEnterScroll(
    refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[]
) {
    const runAnimation = () => {
        const elements = Array.isArray(refs)
            ? refs.map((r) => r.current).filter(Boolean)
            : [refs.current].filter(Boolean) as HTMLElement[];

        const cleanups: (() => void)[] = [];

        elements.forEach((el) => {
            if (!el) return;

            // split into characters
            const split = new SplitText(el, { type: "chars" });

            split.chars.forEach((c) => {
                const charEl = c as HTMLElement;
                charEl.classList.add("relative", "inline-block", "will-change-transform");
                charEl.style.overflow = "visible";
                charEl.style.lineHeight = "1.2";
            });

            // initial state: start above
            gsap.set(split.chars, { yPercent: -110 });

            // animate with ScrollTrigger
            const tween = gsap.to(split.chars, {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: { amount: 0.8, from: "center" },
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    end: "bottom 40%",
                    scrub: 1,
                },
            });

            cleanups.push(() => {
                split.revert();
                tween.scrollTrigger?.kill();
                tween.kill();
            });
        });

        return () => cleanups.forEach((fn) => fn());
    };

    let cleanup: (() => void) | undefined;

    // wait for fonts to load before running animation
    if ("fonts" in document && "ready" in (document as any).fonts) {
        (document as any).fonts.ready.then(() => {
            cleanup = runAnimation();
        });
    } else {
        cleanup = runAnimation();
    }

    return () => cleanup?.();
}

export function splitEnterScrollReverse(
    refs: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[]
) {
    const runAnimation = () => {
        const elements = Array.isArray(refs)
            ? refs.map((r) => r.current).filter(Boolean)
            : [refs.current].filter(Boolean) as HTMLElement[];

        const cleanups: (() => void)[] = [];

        elements.forEach((el) => {
            if (!el) return;

            // split into characters
            const split = new SplitText(el, { type: "chars" });

            split.chars.forEach((c) => {
                const charEl = c as HTMLElement;
                charEl.classList.add("relative", "inline-block", "will-change-transform");
                charEl.style.overflow = "visible";
                charEl.style.lineHeight = "1.2";
            });

            // initial state: start above
            gsap.set(split.chars, { yPercent: 110 });

            // animate with ScrollTrigger
            const tween = gsap.to(split.chars, {
                yPercent: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: { amount: 0.8, from: "center" },
                scrollTrigger: {
                    trigger: el,
                    start: "top 95%",
                    end: "bottom 95%",
                    scrub: 1,
                },
            });

            cleanups.push(() => {
                split.revert();
                tween.scrollTrigger?.kill();
                tween.kill();
            });
        });

        return () => cleanups.forEach((fn) => fn());
    };

    let cleanup: (() => void) | undefined;

    // wait for fonts to load before running animation
    if ("fonts" in document && "ready" in (document as any).fonts) {
        (document as any).fonts.ready.then(() => {
            cleanup = runAnimation();
        });
    } else {
        cleanup = runAnimation();
    }

    return () => cleanup?.();
}