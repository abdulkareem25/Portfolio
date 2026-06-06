import { ArrowUp, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 bg-card/50 backdrop-blur-sm border-t border-border/50 relative flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
        <span>Made with</span>
        <Heart size={14} className="text-red-500 animate-pulse fill-red-500" />
        <span>by Abdul Kareem</span>
      </div>
      <p className="text-xs text-foreground/40 font-medium">
        &copy; {new Date().getFullYear()} All rights reserved.
      </p>
      
      <a
        href="#hero"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-primary/15 border border-primary/50 text-primary hover:bg-gradient-to-br hover:from-primary hover:via-primary hover:to-primary/90 hover:text-primary-foreground hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 shadow-sm"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
