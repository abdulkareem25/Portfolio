import { ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getProjects } from "../services/api";

const projects = [
	{ id: 1, title: "SaaS Landing Page", description: "A beautiful landing page app using React and Tailwind.", image: "/projects/project1.png", tags: ["React", "TailwindCSS", "Supabase"], demoUrl: "#", githubUrl: "#" },
	{ id: 2, title: "DevSync", description: "Collaborate in real time. Build projects, chat, and use AI for coding - all in one platform.", image: "/projects/portfolio.png", tags: ["MERN", "WebContainers", "Socket.io"], demoUrl: "https://dev-syncs.vercel.app/", githubUrl: "https://github.com/abdulkareem25/Dev-Sync/" },
	{ id: 3, title: "E-commerce Platform", description: "Full-featured e-commerce platform with user authentication and payment processing.", image: "/projects/project3.png", tags: ["React", "Node.js", "Stripe"], demoUrl: "#", githubUrl: "#" },
	{ id: 4, title: "Task Management App", description: "Intuitive task management application with drag-and-drop functionality and real-time updates.", image: "/projects/project4.png", tags: ["React", "Node.js", "MongoDB"], demoUrl: "#", githubUrl: "#" },
	{ id: 5, title: "Portfolio Website", description: "Modern portfolio website with dark mode, animations, and responsive design.", image: "/projects/project5.png", tags: ["Next.js", "TypeScript", "Framer Motion"], demoUrl: "#", githubUrl: "#" },
	{ id: 6, title: "Chat Application", description: "Real-time chat application with file sharing, emojis, and group messaging features.", image: "/projects/project6.png", tags: ["React", "Firebase", "WebRTC"], demoUrl: "#", githubUrl: "#" },
];

export const ProjectsSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [projectss, setProjectss] = useState([]);
	const [imageLoadStates, setImageLoadStates] = useState({});
	const touchStartRef = useRef(0);
	const touchEndRef = useRef(0);
	const transitionDuration = 400;
	const totalProjects = projects.length;

	// Pre-load all images to prevent blinking
	useEffect(() => {
		projects.forEach((project) => {
			if (!imageLoadStates[project.id]) {
				const img = new Image();
				img.onload = () => {
					setImageLoadStates(prev => ({
						...prev,
						[project.id]: true
					}));
				};
				img.onerror = () => {
					setImageLoadStates(prev => ({
						...prev,
						[project.id]: false
					}));
				};
				img.src = project.image;
			}
		});
	}, []);

	// Navigation functions
	const goToNext = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => (prev + 1) % totalProjects);
		setTimeout(() => {
			setIsTransitioning(false);
		}, transitionDuration);
	};

	const goToPrevious = () => {
		if (isTransitioning) return;
		setIsTransitioning(true);
		setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
		setTimeout(() => {
			setIsTransitioning(false);
		}, transitionDuration);
	};

	const goToSlide = (index) => {
		if (isTransitioning || index === currentIndex) return;
		setIsTransitioning(true);
		setCurrentIndex(index);
		setTimeout(() => {
			setIsTransitioning(false);
		}, transitionDuration);
	};

	// Touch handlers for mobile swipe
	const handleTouchStart = (e) => {
		touchStartRef.current = e.targetTouches[0].clientX;
	};

	const handleTouchMove = (e) => {
		touchEndRef.current = e.targetTouches[0].clientX;
	};

	const handleTouchEnd = () => {
		if (!touchStartRef.current || !touchEndRef.current) return;
		const distance = touchStartRef.current - touchEndRef.current;
		const isLeftSwipe = distance > 50;
		const isRightSwipe = distance < -50;

		if (isLeftSwipe) {
			goToNext();
		} else if (isRightSwipe) {
			goToPrevious();
		}
	};

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'ArrowLeft') {
				goToPrevious();
			} else if (e.key === 'ArrowRight') {
				goToNext();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	// Get projects from API
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await getProjects();
				setProjectss(response.data);
			} catch (err) {
				console.error("Error Fetching Projects: ", err);
			}
		};
		fetchProjects();
	}, []);

	const getCardTransform = (position) => {
		if (position === 0) {
			return 'translateX(0%) scale(1)';
		}
		const offset = position * 110; // 110% spacing
		const scale = 0.85;
		return `translateX(${offset}%) scale(${scale})`;
	};

	const getCardOpacity = (position) => {
		return position === 0 ? 1 : 0.6;
	};

	const getCardZIndex = (position) => {
		return position === 0 ? 20 : 10;
	};

	const ProjectCard = ({ project, position, index, isCenter }) => {
		const getImageSrc = () => {
			if (imageLoadStates[project.id] === false) {
				return `data:image/svg+xml;base64,${btoa(`
					<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
						<rect width="100%" height="100%" fill="#f1f5f9"/>
						<text x="50%" y="50%" font-family="system-ui" font-size="16" fill="#64748b" text-anchor="middle" dy=".3em">
							${project.title}
						</text>
					</svg>
				`)}`;
			}
			return project.image;
		};

		return (
			<div
				className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[350px] transition-all ease-in-out ${
					!isCenter ? 'cursor-pointer' : ''
				}`}
				style={{
					transform: getCardTransform(position),
					opacity: getCardOpacity(position),
					zIndex: getCardZIndex(position),
					transitionDuration: `${transitionDuration}ms`,
					filter: position === 0 ? 'brightness(1)' : 'brightness(0.8)',
				}}
				onClick={() => !isCenter && goToSlide(index)}
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
							{project.tags.slice(0, 3).map((tag, tagIndex) => (
								<span 
									key={tagIndex} 
									className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors duration-200"
								>
									{tag}
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
							<a 
								href={project.demoUrl} 
								target="_blank" 
								rel="noopener noreferrer" 
								className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 group/link"
								onClick={(e) => e.stopPropagation()}
							>
								<ExternalLink className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
								<span>Demo</span>
							</a>
							<a 
								href={project.githubUrl} 
								target="_blank" 
								rel="noopener noreferrer" 
								className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-300 hover:scale-105 group/link"
								onClick={(e) => e.stopPropagation()}
							>
								<Github className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
								<span>Code</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		);
	};

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

				<div className="relative max-w-4xl mx-auto">
					{/* Carousel Container with Fixed Height */}
					<div 
						className="relative h-[450px] lg:h-[520px] overflow-hidden rounded-2xl bg-gradient-to-br from-background/20 to-muted/20 backdrop-blur-sm border border-border/20 flex items-center justify-center"
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						role="region"
						aria-label="Projects carousel"
						aria-live="polite"
					>
						{/* Render all cards but only show 3 */}
						{[-1, 0, 1].map((position) => {
							const index = (currentIndex + position + totalProjects) % totalProjects;
							return (
								<ProjectCard
									key={`card-${index}`} // Static key based on position
									project={projects[index]}
									position={position}
									index={index}
									isCenter={position === 0}
								/>
							);
						})}
					</div>

					{/* Navigation Buttons */}
					<button
						onClick={goToPrevious}
						disabled={isTransitioning}
						className={`absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-30 p-2 lg:p-3 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border border-border/50 transition-all duration-300 hover:bg-background hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
							isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-2xl'
						}`}
						aria-label="Previous project"
					>
						<ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
					</button>

					<button
						onClick={goToNext}
						disabled={isTransitioning}
						className={`absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-30 p-2 lg:p-3 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border border-border/50 transition-all duration-300 hover:bg-background hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${
							isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-2xl'
						}`}
						aria-label="Next project"
					>
						<ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
					</button>

					{/* Dots Navigation */}
					<div className="flex justify-center gap-2 mt-8">
						{projects.map((_, index) => (
							<button
								key={`dot-${index}`}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
									index === currentIndex
										? 'bg-primary scale-125 shadow-lg'
										: 'bg-primary/25 hover:scale-110'
								}`}
								aria-label={`Go to project ${index + 1}`}
							/>
						))}
					</div>
				</div>

				{/* View All Projects Button */}
				<div className="text-center mt-16">
					<a 
						className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105" 
						target="_blank" 
						rel="noopener noreferrer" 
						href="https://github.com/abdulkareem25"
					>
						<span>View All Projects</span>
						<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</div>

			<style jsx>{`
				.line-clamp-2 {
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
			`}</style>
		</section>
	);
};