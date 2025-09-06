import { cn } from "@/library/utils";
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

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detect scroll for background change
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
            ? "bg-background/70 backdrop-blur-sm shadow-md"
            : "bg-transparent shadow-md",
          "md:py-5 py-3"
        )}
      >
        <div className="container flex items-center justify-between">
          <a
            className="text-xl font-bold text-primary flex items-center"
            href="#hero"
          >
            <span className="relative z-10">
              <span className="text-glow text-foreground"> Abdul </span>
              Kareem
            </span>
          </a>

          {/* desktop nav */}
          <div className="hidden md:flex space-x-8 ml-[166px]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* mobile toggles */}
          <div className="flex items-center gap-2.5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen((p) => !p)}
              className="p-2 text-foreground"
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
              "bg-background/80 backdrop-blur-md",
              "flex flex-col text-center items-center justify-center",
              "transition-opacity duration-200 opacity-100"
            )}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2"
              aria-label="Close Menu"
            >
              <X size={24} />
            </button>

            <div className="flex flex-col space-y-8 text-xl">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="md:text-foreground/80 hover:text-primary text-primary transition-colors duration-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};