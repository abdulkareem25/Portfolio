import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getProjects } from "../../services/api.js";
import ProjectCard from "../ProjectCard.jsx";

const TRANSITION_MS = 400;

export const ProjectsSection = () => {
    const [projects, setProjects] = useState([]);
    const [currentIndex, setIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const touchStartX = useRef(0);
    const total = projects.length;

    /* ── Navigation ──────────────────────────────────────────── */
    const goTo = useCallback((index) => {
        setIndex((prev) => {
            if (prev === index) return prev;
            return (index + total) % total;
        });
    }, [total]);

    const goNext = useCallback(() => setIndex((p) => (p + 1) % total), [total]);
    const goPrevious = useCallback(() => setIndex((p) => (p - 1 + total) % total), [total]);

    /* ── Keyboard navigation ─────────────────────────────────── */
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowLeft") goPrevious();
            if (e.key === "ArrowRight") goNext();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [goNext, goPrevious]);

    /* ── Touch / swipe ──────────────────────────────────────── */
    const onTouchStart = (e) => { touchStartX.current = e.targetTouches[0].clientX; };
    const onTouchEnd = (e) => {
        const delta = touchStartX.current - e.changedTouches[0].clientX;
        if (delta > 50) goNext();
        if (delta < -50) goPrevious();
    };

    /* ── Data fetching ──────────────────────────────────────── */
    useEffect(() => {
        getProjects()
            .then((res) => setProjects(res.data.projects ?? []))
            .catch((err) => console.error("Failed to fetch projects:", err))
            .finally(() => setLoading(false));
    }, []);

    /* ── Render ─────────────────────────────────────────────── */
    return (
        <section id="projects" className="py-24 px-4 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">

                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured <span className="text-primary/60">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        Here are some of my recent projects, each crafted with attention to detail, performance, and user experience.
                    </p>
                </div>

                {/* Carousel */}
                {loading ? (
                    <CarouselSkeleton />
                ) : projects.length === 0 ? (
                    <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 max-w-2xl mx-auto shadow-lg text-center">
                        <p className="text-muted-foreground">
                            No projects available at the moment. Please check back later.
                        </p>
                    </div>
                ) : (
                    <div className="relative max-w-4xl mx-auto">
                        {/* Track */}
                        <div
                            className="relative h-[420px] lg:h-[480px]"
                            style={{ perspective: "1200px" }}
                            onTouchStart={onTouchStart}
                            onTouchEnd={onTouchEnd}
                            role="region"
                            aria-label="Projects carousel"
                            aria-live="polite"
                        >
                            {projects.map((project, index) => {
                                let position = index - currentIndex;
                                const half = total / 2;
                                if (position > half) position -= total;
                                if (position < -half) position += total;

                                return (
                                    <ProjectCard
                                        key={project._id}
                                        project={project}
                                        position={position}
                                        index={index}
                                        isCenter={position === 0}
                                        onSlideClick={goTo}
                                        transitionMs={TRANSITION_MS}
                                    />
                                );
                            })}
                        </div>

                        {/* Prev / Next */}
                        <NavButton direction="left" onClick={goPrevious} label="Previous project" />
                        <NavButton direction="right" onClick={goNext} label="Next project" />

                        {/* Dot indicators */}
                        <div className="flex justify-center gap-3 mt-8" role="tablist" aria-label="Select project">
                            {projects.map((_, i) => (
                                <button
                                    key={i}
                                    role="tab"
                                    aria-selected={i === currentIndex}
                                    aria-label={`Go to project ${i + 1}`}
                                    onClick={() => goTo(i)}
                                    className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${i === currentIndex
                                            ? "w-8 bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                                            : "w-2 bg-primary/20 hover:bg-primary/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA */}
                <div className="text-center mt-12">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-95 transition-all duration-300"
                    >
                        <span>View GitHub Repository</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};

/* ── Sub-components ──────────────────────────────────────────── */

const NavButton = ({ direction, onClick, label }) => (
    <button
        onClick={onClick}
        aria-label={label}
        className={`absolute ${direction === "left" ? "-left-4 lg:-left-8" : "-right-4 lg:-right-8"
            } top-[190px] lg:top-[240px] -translate-y-1/2 z-30 p-3 rounded-xl bg-card/60 backdrop-blur-md shadow-lg border border-border/50 transition-all duration-300 hover:bg-primary/10 hover:border-primary/40 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-foreground group`}
    >
        {direction === "left"
            ? <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:-translate-x-0.5" />
            : <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-0.5" />
        }
    </button>
);

const CarouselSkeleton = () => (
    <div className="relative max-w-4xl mx-auto h-[480px] lg:h-[560px]">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[300px] lg:w-[350px] h-[430px] lg:h-[470px] rounded-2xl bg-muted/20 animate-pulse border border-border/10" />
    </div>
);
