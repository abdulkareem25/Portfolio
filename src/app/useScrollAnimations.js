import { useEffect } from "react";

/**
 * Loads a script tag from a CDN URL and returns a Promise that resolves when loaded.
 * Idempotent — won't add the same script twice.
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

/**
 * Sets initial invisible states on all animated elements BEFORE they animate in,
 * preventing a flash of visible content while GSAP is loading.
 */
function setInitialStates(gsap) {
  // ── Hero ───────────────────────────────────────────────────────
  gsap.set(".gsap-hero-greeting", { opacity: 0, y: 80 });
  gsap.set(".gsap-hero-title",    { opacity: 0, y: 80 });
  gsap.set(".gsap-hero-subtitle", { opacity: 0, y: 80 });
  gsap.set(".gsap-hero-cta",      { opacity: 0, y: 60, scale: 0.88 });

  // ── About ──────────────────────────────────────────────────────
  gsap.set(".gsap-about-heading", { opacity: 0, x: -70 });
  gsap.set(".gsap-about-subtext", { opacity: 0, y: 45 });
  gsap.set(".gsap-about-left",    { opacity: 0, x: -70 });
  gsap.set(".gsap-about-right",   { opacity: 0, x: 70 });

  // ── Skills ─────────────────────────────────────────────────────
  gsap.set(".gsap-skills-heading", { opacity: 0, y: -55 });
  gsap.set(".gsap-skills-subtext", { opacity: 0, y: 45 });
  gsap.set(".gsap-skill-item",     { opacity: 0, y: 55 });

  // ── Projects ───────────────────────────────────────────────────
  gsap.set(".gsap-projects-heading",  { opacity: 0, y: 65 });
  gsap.set(".gsap-projects-subtext",  { opacity: 0, y: 45 });
  gsap.set(".gsap-projects-carousel", { opacity: 0, y: 65, scale: 0.93 });
  gsap.set(".gsap-projects-cta",      { opacity: 0, y: 45 });

  // ── Contact ────────────────────────────────────────────────────
  gsap.set(".gsap-contact-heading",     { opacity: 0, y: 65 });
  gsap.set(".gsap-contact-subtext",     { opacity: 0, y: 45 });
  gsap.set(".gsap-contact-whatsapp",    { opacity: 0, y: 55 });
  gsap.set(".gsap-contact-divider",     { opacity: 0 });
  gsap.set(".gsap-contact-social-item", { opacity: 0, y: 45 });
}

/**
 * Registers all ScrollTrigger-based animations.
 *
 * ScrollTrigger settings explained:
 *   start: "top 88%"   → animation plays when element top hits 88% down the viewport (entering from below)
 *   end:   "bottom top" → reverse fires only when element bottom scrolls above the viewport top
 *                          i.e. the element is completely off-screen — never while it is still visible
 *   toggleActions: "play none none reverse"
 *     ┌─ onEnter   → play forward
 *     │  onLeave   → nothing (element stays visible as user scrolls down through it)
 *     │  onEnterBack → nothing (already visible, no need to replay)
 *     └─ onLeaveBack → reverse (user has scrolled back up past the start point)
 */
function registerAnimations(gsap, ScrollTrigger) {
  const ease      = "power3.out";
  const scaleEase = "back.out(1.4)";

  // Shared defaults for individual element triggers
  const EL = {
    toggleActions: "play none none reverse",
    start: "top 72%",
    end:   "bottom top",
  };

  // ────────────────────────────────────────────────────────────────
  // HERO — fires once on load; no ScrollTrigger (hero is always in viewport)
  // ────────────────────────────────────────────────────────────────
  gsap.timeline({ delay: 0.1 })
    .to(".gsap-hero-greeting", { opacity: 1, y: 0,     duration: 1,   ease })
    .to(".gsap-hero-title",    { opacity: 1, y: 0,     duration: 1,   ease },          "-=0.8")
    .to(".gsap-hero-subtitle", { opacity: 1, y: 0,     duration: 1,   ease },          "-=0.6")
    .to(".gsap-hero-cta",      { opacity: 1, y: 0, scale: 1, duration: 1, ease: scaleEase }, "-=0.5");

  // ────────────────────────────────────────────────────────────────
  // ABOUT
  // ────────────────────────────────────────────────────────────────
  gsap.to(".gsap-about-heading", {
    opacity: 1, x: 0, duration: 1.0, ease,
    scrollTrigger: { trigger: ".gsap-about-heading", ...EL },
  });

  gsap.to(".gsap-about-subtext", {
    opacity: 1, y: 0, duration: 0.9, ease,
    scrollTrigger: { trigger: ".gsap-about-subtext", ...EL },
  });

  gsap.to(".gsap-about-left", {
    opacity: 1, x: 0, duration: 1.0, ease,
    scrollTrigger: { trigger: ".gsap-about-left", ...EL },
  });

  gsap.to(".gsap-about-right", {
    opacity: 1, x: 0, duration: 1.0, ease,
    scrollTrigger: { trigger: ".gsap-about-right", ...EL },
  });

  // ────────────────────────────────────────────────────────────────
  // SKILLS
  // ────────────────────────────────────────────────────────────────
  gsap.to(".gsap-skills-heading", {
    opacity: 1, y: 0, duration: 1.0, ease,
    scrollTrigger: { trigger: ".gsap-skills-heading", ...EL },
  });

  gsap.to(".gsap-skills-subtext", {
    opacity: 1, y: 0, duration: 0.9, ease,
    scrollTrigger: { trigger: ".gsap-skills-subtext", ...EL },
  });

  // Skill pills — section-level trigger so the whole group stays visible
  // while the user reads the section. Reverses only when #skills bottom
  // scrolls back above the top of the viewport.
  gsap.to(".gsap-skill-item", {
    opacity: 1, y: 0, duration: 0.7, ease, stagger: 0.08,
    scrollTrigger: {
      id: "skill-items",
      trigger: "#skills",
      toggleActions: "play none none reverse",
      start: "top 80%",
      end:   "bottom top",
    },
  });

  // ────────────────────────────────────────────────────────────────
  // PROJECTS
  // ────────────────────────────────────────────────────────────────
  gsap.to(".gsap-projects-heading", {
    opacity: 1, y: 0, duration: 1.0, ease,
    scrollTrigger: { trigger: ".gsap-projects-heading", ...EL },
  });

  gsap.to(".gsap-projects-subtext", {
    opacity: 1, y: 0, duration: 0.9, ease,
    scrollTrigger: { trigger: ".gsap-projects-subtext", ...EL },
  });

  gsap.to(".gsap-projects-carousel", {
    opacity: 1, y: 0, scale: 1, duration: 1, ease: scaleEase,
    scrollTrigger: { trigger: ".gsap-projects-carousel", ...EL },
  });

  gsap.to(".gsap-projects-cta", {
    opacity: 1, y: 0, duration: 0.9, ease,
    scrollTrigger: { trigger: ".gsap-projects-cta", ...EL },
  });

  // ────────────────────────────────────────────────────────────────
  // CONTACT
  // ────────────────────────────────────────────────────────────────
  gsap.to(".gsap-contact-heading", {
    opacity: 1, y: 0, duration: 1.0, ease,
    scrollTrigger: { trigger: ".gsap-contact-heading", ...EL },
  });

  gsap.to(".gsap-contact-subtext", {
    opacity: 1, y: 0, duration: 0.9, ease,
    scrollTrigger: { trigger: ".gsap-contact-subtext", ...EL },
  });

  gsap.to(".gsap-contact-whatsapp", {
    opacity: 1, y: 0, duration: 1.0, ease: scaleEase,
    scrollTrigger: { trigger: ".gsap-contact-whatsapp", ...EL },
  });

  gsap.to(".gsap-contact-divider", {
    opacity: 1, duration: 0.7, ease,
    scrollTrigger: { trigger: ".gsap-contact-divider", ...EL },
  });

  // Social links — section-level trigger for consistent group behaviour
  gsap.to(".gsap-contact-social-item", {
    opacity: 1, y: 0, duration: 0.7, ease, stagger: 0.1,
    scrollTrigger: {
      trigger: "#contact",
      toggleActions: "play none none reverse",
      start: "top 85%",
      end:   "bottom top",
    },
  });

  // ────────────────────────────────────────────────────────────────
  // SKILLS TAB OBSERVER
  // Watches for React re-renders caused by tab changes and re-registers
  // the skill-item animation so newly mounted pills start hidden & animate in.
  // ────────────────────────────────────────────────────────────────
  const skillsSection = document.querySelector("#skills");
  if (skillsSection) {
    let debounceTimer = null;

    const observer = new MutationObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        const newItems = document.querySelectorAll(".gsap-skill-item");
        if (!newItems.length) return;

        // Kill the old skill trigger (now has id so this works correctly)
        ScrollTrigger.getAll()
          .filter((t) => t.vars?.id === "skill-items")
          .forEach((t) => t.kill());

        // Reset items to invisible
        gsap.set(".gsap-skill-item", { opacity: 0, y: 55 });

        // Check if the skills section is already visible in the viewport
        const rect = skillsSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInView) {
          // User is already looking at skills — animate directly, no ScrollTrigger needed
          gsap.to(".gsap-skill-item", {
            opacity: 1, y: 0, duration: 0.5, ease, stagger: 0.06, delay: 0.05,
          });
        } else {
          // User has scrolled away — register a new ScrollTrigger for when they return
          gsap.to(".gsap-skill-item", {
            opacity: 1, y: 0, duration: 0.7, ease, stagger: 0.08,
            scrollTrigger: {
              id: "skill-items",
              trigger: "#skills",
              toggleActions: "play none none reverse",
              start: "top 80%",
              end:   "bottom top",
            },
          });
        }
        // NOTE: ScrollTrigger.refresh() has been removed — not needed here
        // and was the main cause of the jank
      }, 150); // increased from 60ms to 150ms for React to finish reconciling
    });

    // subtree: false — only watch for direct children changing (the tab content swap)
    // This fires once per tab switch instead of dozens of times
    observer.observe(skillsSection, { childList: true, subtree: false });

    window.__portfolioSkillsObserver = observer;
  }
}

/**
 * useScrollAnimations
 *
 * Loads GSAP + ScrollTrigger via CDN once on mount, wires up all
 * bidirectional scroll animations, and cleans up cleanly on unmount.
 *
 * The empty dependency array guarantees this effect runs exactly once —
 * so re-renders (theme toggle, resize, etc.) never kill the animations.
 */
export function useScrollAnimations() {
  useEffect(() => {
    let ctx = null;

    async function init() {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"
        );

        const gsap          = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;
        if (!gsap || !ScrollTrigger) return;

        gsap.registerPlugin(ScrollTrigger);

        // Hide all animated elements before any paint to prevent FOUC
        setInitialStates(gsap);

        // All GSAP / ScrollTrigger work lives inside this context so
        // ctx.revert() is the single point that tears everything down.
        ctx = gsap.context(() => {
          registerAnimations(gsap, ScrollTrigger);
        });
      } catch (err) {
        console.warn("[useScrollAnimations] GSAP failed to load:", err);
      }
    }

    if (document.readyState === "complete") {
      init();
    } else {
      window.addEventListener("load", init, { once: true });
    }

    // Cleanup — only called on TRUE component unmount, never on re-render
    return () => {
      if (ctx) ctx.revert();

      // Disconnect the skills tab observer if it exists
      if (window.__portfolioSkillsObserver) {
        window.__portfolioSkillsObserver.disconnect();
        delete window.__portfolioSkillsObserver;
      }
    };
  }, []); // ← empty array = mount once, clean up once
}
