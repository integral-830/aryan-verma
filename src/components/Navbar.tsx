import React, {useState} from "react";
import {motion} from "framer-motion";

const Navbar = () => {
    const [expanded, setExpanded] = useState(false);

    const items = [
        { href: "#", label: "Projects" },
        { href: "#", label: "Components" },
        { href: "#", label: "Information" },
    ];

    return (
        <div
            className="md:flex flex-row-reverse items-center gap-x-2 fixed top-0 right-0 p-4 z-50 hidden"
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
        >
            {items.map((item, index) => (
                <StackingNavbarItem
                    expanded={expanded}
                    key={index}
                    index={index}
                >
                    {item.label}
                </StackingNavbarItem>
            ))}
        </div>
    );
};

const StackingNavbarItem = ({
                                children,
                                style,
                                expanded,
                                index,
                            }: {
    children: React.ReactNode;
    style?: React.CSSProperties;
    expanded: boolean;
    index: number;
}) => {
    return (
        <motion.div
            initial={{ x: 100 * index }}
            animate={{ x: expanded ? 0 : 100 * index }}
            transition={{
                duration: 0.6,
                ease: "circInOut",
                delay: 0.1 * index,
                type: "spring",
            }}
            style={{ zIndex: 100 - index }}
        >
            <div
                onClick={()=>{alert(children)}}
                className="flex items-center text-sm px-5 py-3 rounded-3xl bg-[#D0D0D03a] no-underline text-black backdrop-blur-lg hover:bg-[#D0D0D0] hover:text-black transition-colors duration-300 ease-in-out"
                style={style}
            >
                {children}
            </div>
        </motion.div>
    );
};

export { Navbar };