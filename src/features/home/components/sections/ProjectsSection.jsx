import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "../../../shared/components/ProjectCard.jsx";
import { cn } from "@/app/utils";

const TRANSITION_MS = 400;

/* ── Static project data ─────────────────────────────────────── */
const PROJECTS = [
    {
        _id: "1",
        title: "MindVault",
        description:
            "An AI-powered personal memory assistant for coding, deen, admin, and life. It combines real-time chat, persistent memory, secure authentication, and AI-driven conversations to help organize and retrieve information contextually.",
        techStack: ["React", "Redux Toolkit", "Socket.io", "MongoDB", "LangChain", "Mistral AI"],
        githubLink: "https://github.com/abdulkareem25/mindvault",
        liveLink: "https://mindvault-6exy.onrender.com/",
        imageLink: "https://ik.imagekit.io/abdulkareem25/projects/MindVault.png",
    },
    {
        _id: "2",
        title: "Clipzy",
        description:
            "A modern social media platform for sharing content and building communities. It includes a full-stack setup with authentication, content sharing, and a scalable backend workflow.",
        techStack: ["React", "Express.js", "MongoDB", "JWT Authentication", "REST APIs"],
        githubLink: "https://github.com/abdulkareem25/clipzy",
        liveLink: "https://clipzy-ivrr.onrender.com",
        imageLink: "https://ik.imagekit.io/abdulkareem25/projects/clipzy.png",
    },
    {
        _id: "3",
        title: "Dev-Sync",
        description:
            "A modern full-stack platform built for seamless team collaboration with an AI-powered experience. Designed to support communication, coordination, and productivity in one place.",
        techStack: ["React", "Full-Stack", "AI Integration", "Realtime Features"],
        githubLink: "https://github.com/abdulkareem25/Dev-Sync",
        liveLink: "https://your-live-link.com",
        imageLink: "https://ik.imagekit.io/abdulkareem25/projects/DevSync.png",
    },
    {
        _id: "4",
        title: "Personal OS",
        description:
            "A React-based desktop environment simulator styled like macOS. It works as an interactive portfolio and personal dashboard, presenting your work in a visually unique way.",
        techStack: ["React", "SCSS", "JavaScript", "HTML"],
        githubLink: "https://github.com/abdulkareem25/personal-os",
        liveLink: "https://abdulkareem25.github.io/personal-os/",
        imageLink: "https://ik.imagekit.io/abdulkareem25/projects/PersonalOS.png",
    },
    {
        _id: "5",
        title: "Portfolio",
        description:
            "My personal portfolio website built to showcase projects, skills, and experience with a modern, responsive design and a polished developer-focused presentation.",
        techStack: ["React", "Redux Toolkit", "Tailwind CSS", "Vite"],
        githubLink: "https://github.com/abdulkareem25/Portfolio",
        liveLink: "https://abdulkareem25.github.io/Portfolio/",
        imageLink: "https://ik.imagekit.io/abdulkareem25/projects/Portfolio.png",
    },
    {
        _id: "6",
        title: "PromptGen",
        description: "AI-powered prompt engineering platform that transforms basic prompts into five expertly crafted variations. Saves 70% time with intelligent enhancement, real-time processing, and secure API management for superior AI outputs.",
        techStack: ["React", "Node.js", "MongoDB", "TailwindCSS"],
        githubLink: "https://github.com/abdulkareem25/promptgen",
        liveLink: "https://your-live-link.com",
        imageLink: "https://ik.imagekit.io/abdulkareem25/projects/promptgen.png",
    },
    {
        _id: "7",
        title: "Inter Batch Showdown",
        description: "Professional web-based visual design editor with intuitive drag-and-drop interface, real-time property editing, layer management, and advanced transformations. Export designs as JSON or HTML for seamless web publishing.",
        techStack: ["Vanilla JavaScript", "HTML5", "CSS3", "DOM APIs"],
        githubLink: "https://github.com/abdulkareem25/inter-batch-showdown",
        liveLink: "https://abdulkareem25-inter-batch-showdown.vercel.app/",
        imageLink: "https://ik.imagekit.io/abdulkareem25/projects/Inter.png",
    },
];

export const ProjectsSection = () => {
    const [currentIndex, setIndex] = useState(0);
    const touchStartX = useRef(0);
    const projects = PROJECTS;
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

    /* ── Render ─────────────────────────────────────────────── */
    return (
        <section id="projects" className="py-28 px-4 relative overflow-hidden">
            {/* ── Ambient glows ── */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] opacity-60" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-40" />
                <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/6 rounded-full blur-3xl opacity-40" />
            </div>

            <div className="container mx-auto max-w-5xl relative z-10">

                {/* Heading */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-[1.1]">
                        Featured <span className="text-muted-foreground">Projects</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                        Here are some of my recent projects, each crafted with attention to detail, performance, and user experience.
                    </p>
                </div>

                {/* Carousel */}
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
                                    ? "w-8 bg-foreground/70 shadow-sm"
                                    : "w-2 bg-border hover:bg-muted-foreground/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-14">
                    <a
                        href="https://github.com/abdulkareem25/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm",
                            "bg-card/70 border border-border/50 backdrop-blur-md",
                            "transition-all duration-300",
                            "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 hover:bg-card/80",
                            "overflow-hidden"
                        )}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative text-foreground/80 group-hover:text-foreground transition-colors">
                            View GitHub Repository
                        </span>
                        <ArrowRight className="relative w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground" />
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
        className={`hidden md:block absolute ${direction === "left" ? "-left-4 lg:-left-8" : "-right-4 lg:-right-8"
            } top-[190px] lg:top-[240px] -translate-y-1/2 z-30 p-3 rounded-2xl bg-card/60 backdrop-blur-md shadow-lg border border-border/50 transition-all duration-300 hover:bg-card/80 hover:border-primary/40 hover:scale-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 text-muted-foreground group`}
    >
        {direction === "left"
            ? <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:-translate-x-0.5 group-hover:text-foreground" />
            : <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        }
    </button>
);
