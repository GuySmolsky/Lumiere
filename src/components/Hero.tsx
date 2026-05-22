"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax values for floating elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  // Staggered text animation
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { y: 50, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { 
        duration: 1, 
        // Added 'as const' here to fix the TypeScript Easing error
        ease: [0.16, 1, 0.3, 1] as const 
      } 
    },
  };

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: y1, rotate: rotate1 }} 
          className="absolute top-[15%] left-[10%] w-[30vh] max-w-[300px] aspect-[3/4] mix-blend-multiply opacity-90"
        >
          <Image 
            src="/images/bottle1.png" 
            alt="Lumiere Serum" 
            fill 
            className="object-contain" 
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </motion.div>

        <motion.div 
          style={{ y: y2, rotate: rotate2 }} 
          className="absolute top-[20%] right-[15%] w-[25vh] max-w-[250px] aspect-square mix-blend-multiply opacity-80"
        >
          <Image 
            src="/images/leaf1.png" 
            alt="Botanical Leaf" 
            fill 
            className="object-contain" 
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </motion.div>

        <motion.div 
          style={{ y: y3, rotate: rotate2 }} 
          className="absolute bottom-[5%] left-[25%] w-[25vh] max-w-[250px] aspect-square mix-blend-multiply opacity-80"
        >
          <Image 
            src="/images/bottle2.png" 
            alt="Lumiere Cream" 
            fill 
            className="object-contain" 
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>

        <motion.div 
          style={{ y: y4, rotate: rotate1 }} 
          className="absolute top-[60%] right-[5%] w-[35vh] max-w-[350px] aspect-square mix-blend-multiply opacity-70"
        >
          <Image 
            src="/images/leaf2.png" 
            alt="Botanical Leaf" 
            fill 
            className="object-contain" 
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col items-center justify-center text-center px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="overflow-hidden mb-4">
          <motion.p 
            variants={textVariants}
            className="uppercase tracking-[0.3em] text-sm text-[var(--color-sage)] font-semibold"
          >
            Paris, France
          </motion.p>
        </div>

        <div className="overflow-hidden mb-2">
          <motion.h1 
            variants={textVariants}
            className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] tracking-tight mix-blend-difference"
          >
            LUMIÈRE
          </motion.h1>
        </div>

        <div className="overflow-hidden mb-12">
          <motion.h2 
            variants={textVariants}
            className="font-serif text-[clamp(2rem,5vw,5rem)] leading-[1] text-foreground/80 italic"
          >
            The Art of Radiance.
          </motion.h2>
        </div>

        <div className="overflow-hidden mb-16 max-w-md">
          <motion.p 
            variants={textVariants}
            className="text-balance text-foreground/60 leading-relaxed max-w-sm mx-auto"
          >
            Sustainably sourced. Scientifically refined. Discover your organic minimalist skincare ritual.
          </motion.p>
        </div>

        <motion.div variants={textVariants} className="mt-8">
          <button 
            data-cursor="Drag"
            className="relative group overflow-hidden rounded-full py-4 px-10 border border-foreground/20 hover:border-foreground/40 transition-colors"
          >
            {/* Pulse glow background */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-700 blur-xl" />
            
            <span className="relative z-10 uppercase tracking-[0.15em] text-sm font-medium text-foreground">
              Start Your Ritual
            </span>
            
            {/* Button subtle fill */}
            <div className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-700 ease-[0.16,1,0.3,1] opacity-50" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}