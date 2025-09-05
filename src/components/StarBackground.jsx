import { useEffect, useState } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDarkMode(theme === "dark");

    if (theme === "dark") {
      generateStars();
      generateMeteors();
    } else {
      setStars([]);
      setMeteors([]);
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
      generateStars();
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
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
    const numberOfMeteors = window.innerWidth < 768 ? 7 : 7;
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
        x: x,
        y: Math.random() * (maxY - startY) + startY,
        delay: Math.random() * 25,
        animationDuration: Math.random() * 2 + 3,
        endX: 100,
        endY: 100,
      });
    }

    setMeteors(newMeteors);
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star animate-pulse-subtle"
          style={{
            width: star.size + "px",
            height: star.size + "px",
            left: star.x + "%",
            top: star.y + "%",
            opacity: star.opacity,
            animationDuration: star.animationDuration + "s",
          }}
        />
      ))}

      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="meteor animate-meteor"
          style={{
            width: meteor.size * 50 + "px",
            height: meteor.size * 2 + "px",
            left: meteor.x + "%",
            top: meteor.y + "%",
            animationDelay: meteor.delay,
            animationDuration: meteor.animationDuration + "s",
          }}
        />
      ))}
    </div>
  );
};