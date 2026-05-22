"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-[50] transition-all duration-500`}
    >
      <div className="flex items-center justify-between px-8 py-4 gap-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-[20px] shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-8 text-sm uppercase tracking-[0.2em] font-medium text-foreground/80">
          <Link href="#store" className="hover:text-foreground transition-colors">Store</Link>
          <Link href="#ritual" className="hover:text-foreground transition-colors">Ritual</Link>
        </div>
        
        <Link href="/" className="font-serif text-2xl tracking-widest text-foreground mix-blend-difference">
          LUMIÈRE
        </Link>

        <div className="flex items-center gap-8 text-sm uppercase tracking-[0.2em] font-medium text-foreground/80">
          <Link href="#about" className="hover:text-foreground transition-colors">About</Link>
          <Link href="#cart" className="hover:text-foreground transition-colors">Cart (0)</Link>
        </div>
      </div>
    </motion.nav>
  );
}
