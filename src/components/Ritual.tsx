"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

const RITUAL_STEPS = [
  {
    id: "cleanse",
    title: "01. Cleanse",
    description: "Wash away the unnecessary. Reveal the pure essential.",
    color: "#FFFDD0", // Silk Cream
    img: "/images/bottle1.png",
  },
  {
    id: "tone",
    title: "02. Tone",
    description: "Balance and preparation. A deep reset for the dermis.",
    color: "#E8DCC4", // Soft Clay
    img: "/images/leaf1.png",
  },
  {
    id: "hydrate",
    title: "03. Hydrate",
    description: "Seal moisture perfectly. Flourish into radiance.",
    color: "#B2AC88", // Sage Green
    img: "/images/bottle2.png",
  },
];

export default function Ritual() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map scroll progress to a horizontal move
  // There are 3 panels, so we need to move from 0 to -66.66%
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.6666%"]);

  // We change the body background variable using useMotionValueEvent
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let bgColor = RITUAL_STEPS[0].color;
    if (latest > 0.33 && latest <= 0.66) {
      bgColor = RITUAL_STEPS[1].color;
    } else if (latest > 0.66) {
      bgColor = RITUAL_STEPS[2].color;
    }
    
    // Smooth background color update on the body element via CSS var
    document.body.style.setProperty("--background", bgColor);
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent" id="ritual">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
          {RITUAL_STEPS.map((step, index) => {
            return (
              <div 
                key={step.id} 
                className="w-screen h-full flex flex-col md:flex-row items-center justify-center p-8 md:p-24 gap-12 md:gap-24"
              >
                <div 
                  className="w-full md:w-1/2 flex justify-center perspective-[1000px]"
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
                    whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ amount: 0.5 }}
                    data-cursor="View"
                    className="relative w-[60vw] md:w-[40vw] max-w-[500px] aspect-[4/5] liquid-reveal mix-blend-multiply group"
                  >
                    <Image
                      src={step.img}
                      alt={step.title}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-[1.5s] ease-[0.16,1,0.3,1]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <motion.h3 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ amount: 0.5 }}
                    className="font-serif text-[clamp(2.5rem,6vw,6rem)] leading-none mb-6"
                  >
                    {step.title}
                  </motion.h3>
                  
                  <motion.p 
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ amount: 0.5 }}
                    className="text-foreground/70 text-lg md:text-xl max-w-sm text-balance"
                  >
                    {step.description}
                  </motion.p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
