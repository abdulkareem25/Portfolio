import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 px-4 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container max-w-5xl mx-auto text-center z-10">
        <div className="space-y-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            <span className="opacity-0 animate-fade-in block text-foreground/80 text-3xl md:text-5xl mb-3 font-bold">Hi, I'm</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1 inline-block">
              Abdul
            </span>
            <span className="text-foreground opacity-0 animate-fade-in-delay-2 inline-block ml-3 text-glow">
              Kareem
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3 leading-relaxed">
            I create stellar web experiences with modern technologies.
            Specializing in front-end development, I build interfaces that are
            both <span className="text-foreground font-medium">beautiful</span> and <span className="text-foreground font-medium">functional</span>.
          </p>

          <div className="pt-8 opacity-0 animate-fade-in-delay-4 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
              href="#projects"
            >
              <span>View My Work</span>
            </a>
            <a
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary/15 backdrop-blur-sm border border-primary/50 text-primary hover:bg-primary/25 hover:border-primary/80 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
              href="#contact"
            >
              <span>Contact Me</span>
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer group">
        <span className="text-xs font-semibold text-foreground/40 uppercase tracking-widest mb-3 group-hover:text-primary transition-colors"> Scroll </span>
        <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <ArrowDown className="h-5 w-5" />
        </div>
      </a>
    </section>
  );
};
