import { cn } from "@/app/utils";
import { ExternalLink, Github } from "lucide-react";

const FALLBACK_SVG = (title) =>
    `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="#1a1a2e"/><text x="50%" y="50%" font-family="system-ui" font-size="20" fill="#8888cc" text-anchor="middle" dy=".35em">${title}</text></svg>`
    )}`;

const ProjectCard = ({ project, position, index, isCenter, onSlideClick, transitionMs }) => {
    const isVisible = Math.abs(position) <= 1;
    const isSide = Math.abs(position) === 1;

    // Cards are top-aligned. Center card sits at top:0, side cards pushed down to create elevation.
    const getTransform = () => {
        if (position === 0) {
            return "translateX(-50%) scale(1)";
        }
        const xShift = position * 75;
        const rotateY = position > 0 ? -8 : 8;
        return `translateX(calc(-50% + ${xShift}%)) scale(0.85) rotateY(${rotateY}deg)`;
    };

    return (
        <div
            className={`absolute left-1/2 w-[320px] lg:w-[380px] ${isSide ? "cursor-pointer" : ""}`}
            style={{
                top: isCenter ? 0 : '40px',
                transform: getTransform(),
                opacity: isVisible ? (isCenter ? 1 : 0.6) : 0,
                zIndex: isCenter ? 20 : 10,
                filter: isCenter ? "none" : "brightness(0.6) blur(2px)",
                transition: `all ${transitionMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                pointerEvents: isVisible ? "auto" : "none",
                transformStyle: "preserve-3d",
                transformOrigin: "top center",
            }}
            onClick={() => isSide && onSlideClick(index)}
            aria-label={`Project: ${project.title}`}
            role={isSide ? "button" : undefined}
            tabIndex={isCenter ? 0 : -1}
        >
            <div className="group bg-card/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-border/50 hover:border-primary/30 flex flex-col h-[420px] lg:h-[460px]">

                {/* Image */}
                <div className="h-48 lg:h-56 overflow-hidden bg-muted/20 relative shrink-0">
                    <img
                        src={project.imageLink !== "#" ? project.imageLink : FALLBACK_SVG(project.title)}
                        alt={project.title}
                        draggable="false"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-80" />

                    {/* Floating Tech Badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap justify-center gap-2">
                        {(project.techStack || project.technologies || []).slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-lg bg-background/60 backdrop-blur-md text-muted-foreground border border-border/40 shadow-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="p-5 lg:p-6 flex flex-col flex-grow justify-between gap-4">
                    <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground transition-colors duration-300 mb-2">
                            {project.title}
                        </h3>

                        {/* Full description on active card, clamped on side cards */}
                        <p
                            className={`text-muted-foreground text-sm leading-relaxed ${isCenter
                                ? "card-description-scroll max-h-[4.5rem] pr-1"
                                : "line-clamp-2"
                                }`}
                        >
                            {project.description}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/40 mt-auto shrink-0">
                        <ProjectLink href={project.liveLink} icon={<ExternalLink className="w-4 h-4" />} label="Live Demo" primary />
                        <ProjectLink href={project.githubLink} icon={<Github className="w-4 h-4" />} label="Source Code" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectLink = ({ href, icon, label, primary }) => {
    if (!href || href === "#" || href === "https://your-live-link.com") return null;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={cn(
                "group relative flex items-center justify-center gap-2 flex-1 px-4 py-3 rounded-2xl font-semibold text-xs",
                primary ? "bg-card/70" : "bg-card/60",
                "border border-border/50 backdrop-blur-md",
                "transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/30 hover:bg-card/80",
                "overflow-hidden"
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative text-muted-foreground group-hover:text-foreground transition-colors">
                {icon}
            </div>
            <span className="relative text-muted-foreground group-hover:text-foreground transition-colors">
                {label}
            </span>
        </a>
    );
};

export default ProjectCard;
