"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Search ancestors for data-cursor attribute
      const cursorTarget = target.closest("[data-cursor]");
      
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute("data-cursor") || "View");
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      width: 16,
      height: 16,
      backgroundColor: "var(--foreground)",
      mixBlendMode: "difference" as const,
      opacity: 0.5,
    },
    hover: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      width: 80,
      height: 80,
      backgroundColor: "var(--color-sage)",
      mixBlendMode: "normal" as const,
      opacity: 0.9,
    },
  };

  return (
    <motion.div
      variants={variants}
      animate={isHovered ? "hover" : "default"}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.5,
      }}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-white text-[10px] uppercase tracking-widest font-medium"
      style={{
        originX: 0.5,
        originY: 0.5,
      }}
    >
      {isHovered && cursorText}
    </motion.div>
  );
}
