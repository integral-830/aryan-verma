import {
    Blend,
    Box,
    CodeXml,
    Crop,
    Info,
    Layers,
    Maximize,
    PenTool,
    PlusIcon,
    RadioTower,
    Redo2,
    Repeat1,
    SquareDashed,
    Trash2,
    Type,
    Undo2
} from "lucide-react";
import {MdArrowDropDown, MdOutlineGrid3X3} from "react-icons/md";
import {TfiLocationArrow} from "react-icons/tfi";
import {TbPlayerTrackNext, TbPlayerTrackPrev} from "react-icons/tb";
import {CiPlay1} from "react-icons/ci";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {useEffect, useRef, useState} from "react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

const timeLine = [
    "00:05",
    "00:10",
    "00:15",
    "00:20",
    "00:25",
    "00:30",
    "00:35",
    "00:40",
    "00:45",
    "00:50",
    "00:55",
    "01:00",
    "01:05",
    "01:10",
    "01:15",
    "01:20",
    "01:25",
    "01:30",
    "01:35",
    "01:40",
    "01:45",
    "01:50",
    "01:55",
    "02:00",
    "02:05",
    "02:10",
    "02:15",
    "02:20",
    "02:25",
    "02:30",
    "02:35",
    "02:40",
    "02:45",
    "02:50",
    "02:55",
    "03:00",
    "03:05",
    "03:10",
    "03:15",
    "03:20",
    "03:25",
    "03:30",
    "03:35",
    "03:40",
    "03:45",
    "03:50",
    "03:55",
    "04:00",
    "04:05",
    "04:10",
    "04:15",
    "04:20",
    "04:25",
    "04:30",
]
const filters = [
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
    "G12_Cut_Shot_Collection",
]

gsap.registerPlugin(ScrollTrigger)


const Editor = () => {

    const editorRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const musicRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<HTMLDivElement>(null);
    const stickyHeight = window.innerHeight * 3;
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));
    const loadingRef = useRef<HTMLSpanElement>(document.createElement("span"));
    const [, setImages] = useState<HTMLImageElement[]>([]);
    const frameCount: number = 297;
    const airpods = useRef<{ frame: number }>({frame: 0});

    const currentFrame = (index: number): string =>
        `https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/frames/frame${
            (index + 1).toString()
        }.webp`;

    useEffect(() => {

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d")!;

        const canvasWidth = canvasContainerRef.current!.clientWidth;
        const canvasHeight = canvasContainerRef.current!.clientHeight;
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        const imagesArray: HTMLImageElement[] = [];
        let imagesToLoad: number = frameCount;

        const onLoad = () => {

            imagesToLoad--;
            loadingRef.current.textContent = Math.round(((frameCount - imagesToLoad) / frameCount) * 100) + "%";

            if (imagesToLoad === 0) {

                render();
                gsap.set(canvas, {autoAlpha: 1});
                gsap.to(".loading-container", {autoAlpha: 0});

            }

        };

        for (let i = 0; i < frameCount; i++) {

            const img = new Image();

            img.onload = onLoad;
            img.src = currentFrame(i);
            imagesArray.push(img);

        }

        setImages(imagesArray);

        gsap.to(airpods.current, {
            frame: frameCount - 1,
            snap: "frame",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: `+=${stickyHeight}px`,
                scrub: 0.5,
            },
            onUpdate: render,
        });

        function render() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(imagesArray[airpods.current.frame], 0, 0, canvasWidth, canvasHeight);
        }

    }, []);

    useGSAP(() => {

        gsap.set(editorRef.current, {x: 0, y: "-25lvh", scale: 0.40, rotation: 0, opacity:0.9});

        gsap.to(editorRef.current, {
            scale: 1,
            rotation: 0,
            x: 0,
            y: 0,
            opacity: 1,
            duration: 2,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top bottom",
                end: "top center-=200px",
                scrub: true,
            },
            ease: "linear",
        });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: `+=${stickyHeight}px`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const timelineMaxTranslate = timelineRef.current!.offsetWidth - window.innerWidth;
                const frameMaxTranslate = frameRef.current!.offsetWidth - window.innerWidth;
                const musicMaxTranslate = musicRef.current!.offsetWidth - window.innerWidth;
                const layersMaxTranslate = layersRef.current!.offsetWidth - window.innerWidth;
                const timelineTranslateX = -progress * timelineMaxTranslate;
                const frameTranslateX = -progress * frameMaxTranslate;
                const musicTranslateX = -progress * musicMaxTranslate;
                const layersTranslateX = -progress * layersMaxTranslate;
                gsap.set(timelineRef.current, {x: timelineTranslateX})
                gsap.set(frameRef.current, {x: frameTranslateX})
                gsap.set(musicRef.current, {x: musicTranslateX})
                gsap.set(layersRef.current, {x: layersTranslateX})
            }
        })

    }, [])

    return (
        <div
            id="container"
            ref={containerRef} className="isolate mb-20 relative h-lvh w-full flex px-16 pt-[85px] pointer-events-none"
        >
            <div ref={editorRef}
                 className="isolate relative flex flex-col gap-2 w-full h-full border-2 border-black overflow-hidden bg-black/10 rounded-md py-2 scale-[33%] -rotate-12">
                <div className="w-full h-[50px] items-center flex justify-between text-black px-10">
                    <div className="flex gap-4">
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <PlusIcon className="h-5 w-5 cursor-pointer"/>
                            Add Assets
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Layers className="h-5 w-5 cursor-pointer"/>
                            Layers
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <TfiLocationArrow className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <MdOutlineGrid3X3 className="h-5 w-5 cursor-pointer -rotate-90"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <SquareDashed className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Type className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <PenTool className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Crop className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Box className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <CodeXml className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                    </div>

                </div>
                <div className="bg-black/50 rounded-full w-full h-[2px]"/>
                <div className="isolate relative w-full h-full flex items-center justify-center">
                    <div ref={canvasContainerRef}
                         className="h-full aspect-[16/9] isolate overflow-hidden relative rounded-md border-2 border-black/50">
                        <div className="w-full h-full relative overflow-hidden">
                            <div className="loading-container w-full h-full flex items-center justify-center">
                                <span ref={loadingRef} className=" loading-value text-[10vh] text-black">
                                  0%
                                </span>
                            </div>
                            <canvas ref={canvasRef} className="w-full h-full absolute top-0 overflow-hidden"></canvas>
                        </div>
                    </div>
                    <div
                        className="absolute right-0 top-0 flex flex-col h-full w-[5px] items-center justify-center rounded-md bg-black/20 gap-2 py-8 px-4 overflow-hidden">
                        {timeLine.map((scale) => (
                            <div key={scale} className="flex flex-col items-center gap-2">
                                <h1 className="text-black text-[8px]">{scale}</h1>
                                <div className="bg-black/50 w-full h-[2px] rounded-full"/>
                                <div className="bg-black/50 w-full h-[2px] rounded-full"/>
                                <div className="bg-black/50 w-full h-[2px] rounded-full"/>
                                <div className="bg-black/50 w-full h-[2px] rounded-full"/>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full h-[50px] relative items-center flex justify-between text-black px-10">
                    <div className="flex gap-4">
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Undo2 className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Redo2 className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Trash2 className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <TbPlayerTrackPrev className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <CiPlay1 className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <TbPlayerTrackNext className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Repeat1 className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <RadioTower className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Maximize className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                        <div
                            className="flex h-fit items-center justify-center rounded-full gap-2 py-2 px-4">
                            <Info className="h-5 w-5 cursor-pointer"/>
                            <MdArrowDropDown className="h-5 w-5 cursor-pointer"/>
                        </div>
                    </div>

                </div>
                <div className="isolate relative flex-col w-full h-fit flex items-center gap-2 px-8">
                    <div
                        className="absolute top-0 left-0 bg-gradient-to-tr from-transparent via-transparent to-black/80 h-full w-1/2 z-50 rounded-sm"></div>

                    <div
                        className="relative flex h-[10px] w-full px-10 items-center gap-2 py-4 ">
                        <div
                            ref={timelineRef}
                            className="absolute left-0 flex h-[10px] w-[200vw] px-10 justify-center bg-black/20 gap-2 py-4 rounded-full overflow-hidden">
                            {timeLine.map((scale, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <h1 className="text-black text-[8px]">{scale}</h1>
                                    <div className="bg-black/50 h-[2px] w-[2px] rounded-full"/>
                                    <div className="bg-black/50 h-[2px] w-[2px] rounded-full"/>
                                    <div className="bg-black/50 h-[2px] w-[2px] rounded-full"/>
                                    <div className="bg-black/50 h-[2px] w-[2px] rounded-full"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="isolate relative flex h-[100px] w-full items-center py-2 ">
                        <div ref={frameRef}
                             className="absolute left-0 flex h-fit w-[400vw] items-center justify-between gap-2 py-2 px-20 will-change-transform overflow-hidden">
                            {Array(20).fill("").map((_, index) => {
                                return (
                                    <div key={index}
                                         className="isolate relative flex h-[70px] w-[250px] items-center px-1 py-1 gap-1 rounded-md bg-black/20 mix-blend-difference">
                                        <div className="w-[4px] h-[20px] rounded-full bg-black"/>
                                        <div key={index}
                                             className="relative flex h-full w-full text-[14px] items-center rounded-sm overflow-hidden ">
                                            <img src={`https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/frames/frame${
                                                (index + 1).toString()
                                            }.webp`} className="w-full h-full bg-cover" alt={"img"}/>
                                            <img src={`https://pub-8f7860ad7a6c4483942d3fd56b2ace7f.r2.dev/frames/frame${
                                                (index * 15).toString()
                                            }.webp`} className="w-full h-full bg-cover" alt={"img"}/>
                                        </div>
                                        <div className="w-[4px] h-[20px] rounded-full bg-black"/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex relative h-fit w-full items-center px-10 gap-2 py-4 ">
                        <div
                            ref={musicRef}
                            className="absolute left-0 flex h-[10px] w-[150vw] items-center px-10 bg-black/20 gap-2 py-4 rounded-full overflow-hidden">
                            {Array(30).fill("").map((_, index) => {
                                return (
                                    <div key={index} className="flex items-center gap-1">
                                        <div className={`bg-black/50 h-[4px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[8px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[10px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[6px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[2px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[4px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[6px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[4px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[8px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[10px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[6px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[2px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[4px] w-[2px] rounded-full`}/>
                                        <div className={`bg-black/50 h-[6px] w-[2px] rounded-full`}/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="flex h-fit w-full items-center gap-20 px-10 lg:gap-40 py-4">
                        <div
                            ref={layersRef}
                            className="absolute left-0 flex h-fit w-[200vw] items-center justify-evenly px-10 lg:gap-40 py-2 overflow-hidden">
                            {filters.map((text, index) => {
                                return (
                                    <div key={index}
                                         className="relative flex gap-2 h-fit w-fit text-[14px] items-center justify-center px-4 py-1 rounded-sm bg-gradient-to-l from-white to-black/20">
                                        <Blend className="h-5 w-5 cursor-pointer"/>
                                        <h1 className="inline-block text-black text-[8px]">{text}</h1>
                                    </div>)
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Editor