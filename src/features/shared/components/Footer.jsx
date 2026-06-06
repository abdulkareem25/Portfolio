import { ArrowUp, Heart } from "lucide-react";
import { cn } from "@/app/utils";

export const Footer = () => {
  return (
    <footer className="relative py-10 overflow-hidden bg-card/70 backdrop-blur-md border-t border-border/50 flex flex-col items-center justify-center gap-3">
      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-primary/5 rounded-full blur-[80px] opacity-60" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <span>Made with</span>
          <Heart size={14} className="text-red-500 animate-pulse fill-red-500" />
          <span>by <span className="text-foreground">Abdul Kareem</span></span>
        </div>
        <p className="text-xs text-muted-foreground/60 font-medium tracking-wide">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
      
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
        <a
          href="#hero"
          className={cn(
            "group flex items-center justify-center p-3.5 rounded-2xl",
            "bg-card/60 border border-border/50 backdrop-blur-md shadow-lg",
            "transition-all duration-300",
            "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 hover:bg-card/80",
            "overflow-hidden block"
          )}
          aria-label="Scroll to top"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
          <ArrowUp className="relative w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </a>
      </div>
    </footer>
  );
};
