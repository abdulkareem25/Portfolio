import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { getProjects } from "../services/api";

export const ProjectsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionDuration = 400;
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const touchStartRef = useRef(0);
    const touchEndRef = useRef(0);
    const totalProjects = projects.length;

    // Navigation functions
    const goToNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % totalProjects);
        setTimeout(() => setIsTransitioning(false), transitionDuration);
    };

    const goToPrevious = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
        setTimeout(() => setIsTransitioning(false), transitionDuration);
    };

    const goToSlide = (index) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), transitionDuration);
    };

    // Touch handlers for mobile swipe
    const handleTouchStart = (e) => { touchStartRef.current = e.targetTouches[0].clientX; };
    const handleTouchMove = (e) => { touchEndRef.current = e.targetTouches[0].clientX; };
    const handleTouchEnd = () => {
        if (!touchStartRef.current || !touchEndRef.current) return;
        const distance = touchStartRef.current - touchEndRef.current;
        if (distance > 50) goToNext();
        else if (distance < -50) goToPrevious();
        touchStartRef.current = 0;
        touchEndRef.current = 0;
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') goToPrevious();
            else if (e.key === 'ArrowRight') goToNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isTransitioning]); // Added isTransitioning dependency to get the latest function closures

    // Get projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data);
                setLoading(false);
                // console.log('Fetched projects:', response.data);
            } catch (err) {
                console.error("Error Fetching Projects: ", err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-20 px-4 relative overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Featured <span className="text-primary">Projects</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Here are some of my recent projects. Each project was carefully crafted with attention to detail, performance, and user experience.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
                    </div>
                ) : (
                    projects.length > 0 ? (
                        <div className="relative max-w-4xl mx-auto">
                            <div
                                className="relative h-[450px] lg:h-[520px] rounded-2xl flex items-center justify-center"
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                                role="region"
                                aria-label="Projects carousel"
                            >
                                {/* THE KEY CHANGE IS HERE: Map over all projects and calculate their position */}
                                {projects.map((project, index) => {
                                    let position = index - currentIndex;
                                    const half = totalProjects / 2;

                                    // This logic handles the circular wrapping of the carousel
                                    if (position > half) {
                                        position -= totalProjects;
                                    } else if (position < -half) {
                                        position += totalProjects;
                                    }

                                    return (
                                        <ProjectCard
                                            key={project.id} 
                                            projects={projects}
                                            project={project}
                                            position={position}
                                            index={index}
                                            isCenter={position === 0}
                                            onSlideClick={goToSlide}
                                            transitionDuration={transitionDuration}
                                        />
                                    );
                                })}
                            </div>

                            {/* Navigation Buttons */}
                            <button onClick={goToPrevious} disabled={isTransitioning} className={`absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 p-2 lg:p-3 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border border-border/50 transition-all duration-300 hover:bg-background hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-2xl'}`} aria-label="Previous project">
                                <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
                            </button>
                            <button onClick={goToNext} disabled={isTransitioning} className={`absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 p-2 lg:p-3 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border border-border/50 transition-all duration-300 hover:bg-background hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-2xl'}`} aria-label="Next project">
                                <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
                            </button>

                            {/* Dots Navigation */}
                            <div className="flex justify-center gap-2 mt-8">
                                {projects.map((_, index) => (
                                    <button
                                        key={`dot-${index}`}
                                        onClick={() => goToSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${index === currentIndex ? 'bg-primary scale-125 shadow-lg' : 'bg-primary/25 hover:scale-110'}`}
                                        aria-label={`Go to project ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-muted-foreground">No projects available at the moment. Please check back later.</p>
                    )
                )}


                <div className="text-center mt-16">
                    <a className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105" target="_blank" rel="noopener noreferrer" href="https://github.com/abdulkareem25">
                        <span>View All Projects</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
};