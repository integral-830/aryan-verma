import {useRef} from 'react'
import gsap from 'gsap'

const TiltEffect: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const itemRef = useRef<HTMLDivElement | null>(null);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!itemRef.current) return;

        const { left, top, width, height } = itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;

        gsap.to(itemRef.current, { duration: 1, transform: newTransform });
    };

    const handleMouseLeave = () => {
        gsap.to(itemRef.current, { duration: 1, transform: `` });
    }

    return (
        <div ref={itemRef} className={className} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
            {children}
        </div>
    );
};

export default TiltEffect;