'use client'
import { AnimatePresence, motion, useInView } from "framer-motion"
import { useRef } from "react";

/**
 * Renders a skill level component based on the provided level.
 *
 * @param {number} level - The skill level to display.
 * @return {JSX.Element} - The rendered skill level Rate Stars component.
 */
export function SkillLevel({ level }: { level: number }) {
    // Define an reference to the container element
    const containerRef = useRef(null);
    // Define inView state for the container
    const containerInView = useInView(containerRef ,{amount:1 , once:true});
    // Define animation variants for the container
    const container = {
        hidden: {
            y: 10, opacity: 0, scale: 0,
        },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                // when: "afterChildren",
                staggerChildren: 0.1,
                // duration: 0.1
            }
        }

    };

    // Define animation variants for the stars
    const starsvariants = {
        hidden: { y: 10, opacity: 0, scale: 1 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1
        },
        hover: { scale: 1.5 },
        tap: { scale: 1.2 }
    };

    // Define a full star SVG component
    const star = (
        <motion.svg
            variants={starsvariants}
            whileHover="hover"
            whileTap="tap"
            className="text-yellow-300 hover:text-yellow-400"
            key={"star"}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21z"
            />
        </motion.svg>
    );

    // Define a half star SVG component
    const halfStar = (
        <motion.svg
            variants={starsvariants}
            whileHover="hover"
            whileTap="tap"
            className="text-yellow-300"
            key={"halfStar"}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
        >
            <path
                fill="currentColor"
                d="M12 2L9.19 8.62L2 9.24l5.45 4.73L5.82 21L12 17.27z"
            />
        </motion.svg>
    );

    // Create an array of stars based on the provided level
    const Stars = Array(Math.round(level))
        .fill(null)
        .map((_, i) => (level - i === 0.5 ? halfStar : star));

    return (
        // Render the skill level component
        <motion.div
            ref={containerRef}
            variants={container}
            initial="hidden"
            animate={containerInView ? "visible" : "hidden"}
           
            className="inline-flex my-2"
        >
            
            {/* Render each star */}
            {Stars.map((star, index) => (
                <motion.div key={index} variants={starsvariants}  className="prose cursor-pointer">
                    {star}
                </motion.div>
            ))}
           
        </motion.div>
    );
}
