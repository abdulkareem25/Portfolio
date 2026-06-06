import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarBackground } from "../StarBackground";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { ArrowLeft, Home } from "lucide-react";

/* ── Floating digit particle ─────────────────────────────────── */
const FloatingDigit = ({ char, style }) => (
  <span
    className="absolute select-none font-black text-primary/[0.07] pointer-events-none"
    style={style}
    aria-hidden="true"
  >
    {char}
  </span>
);

/* ── Glitch text hook ────────────────────────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#@%$&";
const useGlitch = (text, active) => {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);
  const iterRef = useRef(0);

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    iterRef.current = 0;
    const maxIter = text.length * 3;

    const tick = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iterRef.current) return text[i];
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join("")
      );
      iterRef.current += 0.4;
      if (iterRef.current < maxIter) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, text]);

  return display;
};

/* ── Background floating digits ─────────────────────────────── */
const BG_DIGITS = [
  { char: "4", style: { top: "8%",  left: "6%",  fontSize: "14vw", opacity: 0.06, transform: "rotate(-15deg)" } },
  { char: "0", style: { top: "12%", right: "4%", fontSize: "18vw", opacity: 0.05, transform: "rotate(12deg)"  } },
  { char: "4", style: { bottom: "10%", left: "3%",  fontSize: "11vw", opacity: 0.05, transform: "rotate(8deg)"  } },
  { char: "4", style: { top: "45%", right: "7%", fontSize: "10vw", opacity: 0.04, transform: "rotate(-8deg)"  } },
  { char: "0", style: { bottom: "18%", right: "2%", fontSize: "13vw", opacity: 0.04, transform: "rotate(20deg)"  } },
];

/* ── Main page ───────────────────────────────────────────────── */
export const NotFoundPage = () => {
  const navigate = useNavigate();
  const [glitching, setGlitching] = useState(false);
  const [mounted, setMounted] = useState(false);

  const glitch404 = useGlitch("404", glitching);
  const glitchMsg = useGlitch("Page Not Found", glitching);

  /* Trigger glitch on mount and periodically */
  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 100);
    const firstGlitch = setTimeout(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 1000);
    }, 800);

    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 900);
    }, 5000);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(firstGlitch);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Background effects */}
      <StarBackground />

      {/* Nav */}
      <Header />

      {/* Background floating 404 digits */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
        {BG_DIGITS.map((d, i) => (
          <FloatingDigit key={i} char={d.char} style={d.style} />
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center relative z-10 px-4 pt-16">

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4  w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50" />
        </div>

        <div
          className="container max-w-3xl mx-auto text-center flex flex-col items-center gap-10"
          style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}
        >

          {/* ── 404 numeral ── */}
          <div className="relative">
            <h1
              className="text-[clamp(7rem,22vw,14rem)] font-black leading-none tracking-tighter select-none"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--foreground)) 60%, hsl(var(--primary)) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 40px hsl(var(--primary) / 0.3))",
              }}
            >
              {glitch404}
            </h1>

            {/* Reflection */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 bottom-0 translate-y-[60%] h-16 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--foreground)) 60%, hsl(var(--primary)) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.12,
                transform: "translateY(60%) scaleY(-1)",
                fontSize: "clamp(7rem,22vw,14rem)",
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              404
            </div>
          </div>

          {/* ── Message ── */}
          <div className="space-y-4 mt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {glitchMsg}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto leading-relaxed">
              Looks like you've drifted into the void. The page you're looking for
              doesn't exist or has been moved to another galaxy.
            </p>
          </div>

          {/* ── CTA Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm sm:max-w-none">
            <a
              href="/"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
            >
              <Home className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Back to Home</span>
            </a>

            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary/15 backdrop-blur-sm border border-primary/50 text-primary hover:bg-primary/25 hover:border-primary/80 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.03] active:scale-95 w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Go Back</span>
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
