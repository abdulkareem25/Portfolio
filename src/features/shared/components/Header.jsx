import { cn } from "@/app/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Detect scroll for background change
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Intersection Observer for scroll spy (active nav item)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" } // Triggers when section crosses the middle of the screen
    );

    const sections = navItems.map((item) => document.querySelector(item.href)).filter(Boolean);
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  // Lock/unlock body scroll via CSS class
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("scroll-lock");
    } else {
      document.body.classList.remove("scroll-lock");
    }
  }, [isMenuOpen]);

  // Close menu when clicking a nav link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 w-full transition-all duration-300 z-[60]",
          isScrolled
            ? "bg-card/70 backdrop-blur-md border-b border-border/50 shadow-sm"
            : "bg-transparent",
          "md:py-4 py-3"
        )}
      >
        <div className="container flex items-center justify-between">
          <a
            className="text-xl font-extrabold flex items-center group transition-transform hover:scale-105"
            href="#hero"
          >
            <span className="relative z-10 whitespace-nowrap text-muted-foreground transition-colors duration-300">
              <span className="text-foreground transition-colors duration-300 group-hover:text-muted-foreground">Abdul</span>
              {" "}<span className="group-hover:text-foreground transition-colors duration-300">Kareem</span>
            </span>
          </a>

          {/* desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-300 relative group py-2",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  <span 
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 transition-all duration-300 rounded-full opacity-80",
                      isActive ? "bg-foreground w-full" : "bg-foreground/50 w-0 group-hover:w-full"
                    )} 
                  />
                </a>
              );
            })}
            <div className="pl-4 border-l flex border-border/50">
              <ThemeToggle />
            </div>
          </div>

          {/* mobile toggles */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="p-2 text-foreground rounded-lg hover:bg-foreground/5 transition-colors"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE OVERLAY VIA PORTAL */}
      {isMenuOpen &&
        createPortal(
          <div
            id="mobile-menu"
            className={cn(
              "fixed inset-0 z-[100] md:hidden",
              "bg-background/95 backdrop-blur-xl",
              "flex flex-col text-center items-center justify-center",
              "transition-all duration-300 ease-in-out opacity-100"
            )}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-3 rounded-full hover:bg-foreground/10 text-foreground transition-colors"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col space-y-8 w-full max-w-xs px-4">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-2xl font-semibold transition-colors duration-300 py-2 border-b border-border/20 last:border-0",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
