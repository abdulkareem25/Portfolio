import { ArrowDown } from "lucide-react";
import { cn } from "@/app/utils";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-4 overflow-hidden"
    >
      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[130px] opacity-60" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="container max-w-3xl mx-auto text-center z-10">
        <div className="flex flex-col items-center space-y-8">

          {/* ── Headline ── */}
          <div className="space-y-2">
            <p className="opacity-0 animate-fade-in text-muted-foreground text-xl md:text-2xl font-medium tracking-wide">
              Hi, I&apos;m Abdul Kareem
            </p>
            <h1 className="opacity-0 animate-fade-in-delay-1 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.08]">
              Full-Stack{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, hsl(var(--foreground)) 40%, hsl(var(--primary)) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Developer
              </span>
            </h1>
          </div>

          {/* ── Sub-copy ── */}
          <p className="opacity-0 animate-fade-in-delay-2 text-muted-foreground text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            I enjoy turning complex ideas into practical products, building
            reliable systems, and constantly improving through hands-on
            development.
          </p>

          {/* ── CTA buttons ── */}
          <div className="opacity-0 animate-fade-in-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm pt-2">
            {/* Primary: View Projects */}
            <a
              href="#projects"
              className={cn(
                "group relative flex items-center justify-center gap-2 w-full sm:flex-1 px-7 py-4 rounded-2xl font-semibold text-base",
                "bg-card/70 border border-border/50 backdrop-blur-md",
                "transition-all duration-300",
                "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 hover:bg-card/80",
                "overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-foreground/80 group-hover:text-foreground transition-colors">
                View Projects
              </span>
              <svg
                className="relative w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Secondary: Get In Touch */}
            <a
              href="#contact"
              className={cn(
                "group relative flex items-center justify-center gap-2 w-full sm:flex-1 px-7 py-4 rounded-2xl font-semibold text-base",
                "bg-card/60 border border-border/50 backdrop-blur-md",
                "transition-all duration-300",
                "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 hover:bg-card/80",
                "overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-muted-foreground group-hover:text-foreground transition-colors">
                Get In Touch
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer group"
      >
        <span className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-widest mb-3 group-hover:text-muted-foreground transition-colors">
          Scroll
        </span>
        <div className="p-2 rounded-full bg-card/60 backdrop-blur-md border border-border/50 group-hover:border-primary/40 group-hover:bg-card/80 transition-all duration-300">
          <ArrowDown className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </a>
    </section>
  );
};
