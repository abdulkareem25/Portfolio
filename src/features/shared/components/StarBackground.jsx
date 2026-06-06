import { useEffect, useState } from "react";

/* Light-mode floating orb definitions — sizes, colours, positions, durations */
const LIGHT_ORBS = [
  { id: 0, w: 520, h: 520, top: "-12%",  left: "-8%",  color: "hsl(250 70% 78% / 0.18)", blur: 80,  delay: "0s",   dur: "14s" },
  { id: 1, w: 420, h: 420, top: "55%",   left: "72%",  color: "hsl(270 65% 80% / 0.16)", blur: 70,  delay: "3s",   dur: "18s" },
  { id: 2, w: 280, h: 280, top: "30%",   left: "18%",  color: "hsl(230 60% 82% / 0.14)", blur: 60,  delay: "6s",   dur: "22s" },
  { id: 3, w: 350, h: 350, top: "-5%",   left: "60%",  color: "hsl(260 65% 76% / 0.13)", blur: 75,  delay: "1.5s", dur: "16s" },
  { id: 4, w: 200, h: 200, top: "75%",   left: "10%",  color: "hsl(240 55% 80% / 0.12)", blur: 50,  delay: "9s",   dur: "20s" },
];

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const dark = theme === "dark";
    setIsDarkMode(dark);

    if (dark) {
      generateStars();
      generateMeteors();
    }

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      setIsDarkMode(isDark);
      if (isDark) {
        generateStars();
        generateMeteors();
      } else {
        setStars([]);
        setMeteors([]);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleResize = () => {
      if (document.documentElement.classList.contains("dark")) generateStars();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );
    const newStars = [];
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }
    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 7;
    const minGap = window.innerWidth < 768 ? 25 : 7;
    const maxX = window.innerWidth < 768 ? 15 : 55;
    const startY = window.innerWidth < 768 ? 10 : 0;
    const maxY = window.innerWidth < 768 ? 70 : 20;
    const newMeteors = [];
    const xPositions = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      let x;
      let attempts = 0;
      do {
        x = Math.random() * maxX;
        attempts++;
        if (attempts > 100) break;
      } while (xPositions.some((xp) => Math.abs(x - xp) < minGap));
      xPositions.push(x);
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x,
        y: Math.random() * (maxY - startY) + startY,
        delay: Math.random() * 25,
        animationDuration: Math.random() * 2 + 3,
      });
    }
    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {/* ── Dark mode: stars + meteors ─────────────────────────── */}
      {isDarkMode && stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width:  star.size + "px",
            height: star.size + "px",
            left:   star.x + "%",
            top:    star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {isDarkMode && meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width:  meteor.size * 50 + "px",
            height: meteor.size * 2 + "px",
            left:   meteor.x + "%",
            top:    meteor.y + "%",
            animationDelay:    meteor.delay,
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}

      {/* ── Light mode: drifting ambient orbs ─────────────────── */}
      {!isDarkMode && LIGHT_ORBS.map((orb) => (
        <div
          key={orb.id}
          className="light-orb"
          style={{
            width:  orb.w + "px",
            height: orb.h + "px",
            top:    orb.top,
            left:   orb.left,
            background: orb.color,
            filter: `blur(${orb.blur}px)`,
            animationDelay:    orb.delay,
            animationDuration: orb.dur,
          }}
        />
      ))}
    </div>
  );
};
