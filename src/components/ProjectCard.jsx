import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";

const ProjectCard = ({ project, position, index, isCenter, onSlideClick, transitionDuration }) => {

    const getCardTransform = (position) => {
        if (position === 0) {
            return 'translateX(0%) scale(1)';
        }
        const offset = position * 110;
        const scale = 0.85;
        return `translateX(${offset}%) scale(${scale})`;
    };

    const getCardOpacity = (position) => {
        // This is the key change: hide cards that are not the center or its immediate neighbors
        if (Math.abs(position) > 1) return 0;
        return position === 0 ? 1 : 0.6;
    };

    const getCardZIndex = (position) => {
        // Lower z-index for cards further away
        return position === 0 ? 20 : 10 - Math.abs(position);
    };

    const getImageSrc = () => {
        if (project.imageUrl === "#") {
            return `data:image/svg+xml;base64,${btoa(`
                <svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="#f1f5f9"/>
                    <text x="50%" y="50%" font-family="system-ui" font-size="16" fill="#64748b" text-anchor="middle" dy=".3em">
                        ${project.title}
                    </text>
                </svg>
            `)}`;
        }
        return project.imageUrl;
    };

    return (
        <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[350px] transition-all ease-in-out ${!isCenter ? 'cursor-pointer' : ''}`}
            style={{
                transform: getCardTransform(position),
                opacity: getCardOpacity(position),
                zIndex: getCardZIndex(position),
                transitionDuration: `${transitionDuration}ms`,
                filter: position === 0 ? 'brightness(1)' : 'brightness(0.8)',
                pointerEvents: Math.abs(position) > 1 ? 'none' : 'auto', // Disable clicks on hidden cards
            }}
            onClick={() => !isCenter && Math.abs(position) === 1 && onSlideClick(index)}
            role="button"
            tabIndex={isCenter ? 0 : -1}
            aria-label={`Project ${index + 1}: ${project.title}`}
        >
            <div className="group bg-card backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-border/30 h-full flex flex-col">
                <div className="h-45 lg:h-52 overflow-hidden bg-gradient-to-br from-muted to-muted/70 relative">
                    <img
                        src={getImageSrc()}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                        draggable="false"
                        style={{
                            imageRendering: 'crisp-edges',
                            WebkitBackfaceVisibility: 'hidden',
                            backfaceVisibility: 'hidden'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 lg:p-6 flex flex-col flex-1">
                    <div className="flex justify-center flex-wrap gap-2 mb-3">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span key={techIndex} className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors duration-200">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <h3 className="text-lg lg:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300 text-center">
                        {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm lg:text-base mb-4 leading-relaxed flex-1 text-center line-clamp-2">
                        {project.description}
                    </p>

                    <div className="flex justify-center gap-4 mt-auto">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 group/link" onClick={(e) => e.stopPropagation()}>
                            <ExternalLink className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
                            <span>Demo</span>
                        </a>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 group/link" onClick={(e) => e.stopPropagation()}>
                            <Github className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
                            <span>Code</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;