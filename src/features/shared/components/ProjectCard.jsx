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
            <div className="group bg-card/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] transition-all duration-300 border border-border/50 hover:border-primary/40 flex flex-col h-[400px] lg:h-[460px]">

                {/* Image */}
                <div className="h-48 lg:h-56 overflow-hidden bg-muted/20 relative shrink-0">
                    <img
                        src={project.imageUrl && project.imageUrl !== "#" ? project.imageUrl : FALLBACK_SVG(project.title)}
                        alt={project.title}
                        draggable="false"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-80" />

                    {/* Floating Tech Badges */}
                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-lg bg-background/80 backdrop-blur-md text-primary border border-primary/20 shadow-sm"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Body */}
                <div className="p-5 lg:p-6 flex flex-col flex-grow justify-between gap-4">
                    <div>
                        <h3 className="text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
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
                    <div className="flex items-center gap-4 pt-4 border-t border-border/40 mt-auto">
                        <ProjectLink href={project.demoUrl} icon={<ExternalLink className="w-4 h-4" />} label="Live Demo" primary />
                        <ProjectLink href={project.githubUrl} icon={<Github className="w-4 h-4" />} label="Source Code" />
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectLink = ({ href, icon, label, primary }) => {
    if (!href || href === "#") return null;

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 flex-1 justify-center ${primary
                ? "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-95"
                : "border border-primary/50 text-primary bg-primary/15 hover:bg-primary/25 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.03] active:scale-95"
                }`}
        >
            {icon}
            <span>{label}</span>
        </a>
    );
};

export default ProjectCard;
