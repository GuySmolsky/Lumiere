import Hero from "@/components/Hero";
import Ritual from "@/components/Ritual";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="w-full">
        <Hero />
        <Ritual />
        {/* Placeholder for footer or additional space to scroll past Ritual */}
        <div className="h-screen flex items-center justify-center bg-[var(--color-cream)] transition-colors duration-[0.8s] ease-in-out">
          <h2 className="font-serif text-4xl text-foreground/50 tracking-widest text-center px-4">
            Embrace the ritual. <br/><span className="text-xl">LUMIÈRE</span>
          </h2>
        </div>
      </main>
    </SmoothScroll>
  );
}
