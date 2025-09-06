import { ArrowRight, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const projects = [
	{ id: 1, title: "SaaS Landing Page", description: "A beautiful landing page app using React and Tailwind.", image: "/projects/project1.png", tags: ["React", "TailwindCSS", "Supabase"], demoUrl: "#", githubUrl: "#" },
	{ id: 2, title: "DevSync", description: "Collaborate in real time. Build projects, chat, and use AI for coding - all in one platform.", image: "/projects/portfolio.png", tags: ["MERN", "WebContainers", "Socket.io"], demoUrl: "https://dev-syncs.vercel.app/", githubUrl: "https://github.com/abdulkareem25/Dev-Sync/" },
	{ id: 3, title: "E-commerce Platform", description: "Full-featured e-commerce platform with user authentication and payment processing.", image: "/projects/project3.png", tags: ["React", "Node.js", "Stripe"], demoUrl: "#", githubUrl: "#" },
	{ id: 4, title: "Task Management App", description: "Intuitive task management application with drag-and-drop functionality and real-time updates.", image: "/projects/project4.png", tags: ["React", "Node.js", "MongoDB"], demoUrl: "#", githubUrl: "#" },
	{ id: 5, title: "Portfolio Website", description: "Modern portfolio website with dark mode, animations, and responsive design.", image: "/projects/project5.png", tags: ["Next.js", "TypeScript", "Framer Motion"], demoUrl: "#", githubUrl: "#" },
	{ id: 6, title: "Chat Application", description: "Real-time chat application with file sharing, emojis, and group messaging features.", image: "/projects/project6.png", tags: ["React", "Firebase", "WebRTC"], demoUrl: "#", githubUrl: "#" },
];

export const ProjectsSection = () => {
	const containerRef = useRef(null);
	const [logicalIndex, setLogicalIndex] = useState(0); // 0..n-1 - which real project is active (center)
	const [isAnimating, setIsAnimating] = useState(false);
	const animationDuration = 450; // ms (keeps in sync with smooth scroll perception)
	const n = projects.length;

	// helper: compute sizes (card width + gap) using measured DOM
	const measure = () => {
		const container = containerRef.current;
		if (!container) return null;
		const firstCard = container.querySelector(".project-card");
		if (!firstCard) return null;
		const cardStyle = window.getComputedStyle(firstCard);
		const cardWidth = firstCard.getBoundingClientRect().width;
		// gap derived from flex gap - read via computed margin between first two cards if present
		const gap = parseFloat(window.getComputedStyle(container).columnGap || window.getComputedStyle(container).gap || 24) || 24;
		const containerWidth = container.clientWidth;
		const centerOffset = (containerWidth - cardWidth) / 2;
		return { cardWidth, gap, centerOffset };
	};

	// scroll to a DOM index (with clones). DOM layout will be:
	// [ cloneLast (0) , real 0 (1) , real 1 (2) , ... , real (n-1) (n) , cloneFirst (n+1) ]
	const scrollToDomIndex = (domIndex, smooth = true) => {
		const container = containerRef.current;
		if (!container) return;
		const m = measure();
		if (!m) return;
		const { cardWidth, gap, centerOffset } = m;
		const stride = cardWidth + gap;
		const target = domIndex * stride - centerOffset;
		container.scrollTo({
			left: Math.max(0, target),
			behavior: smooth ? "smooth" : "auto",
		});
	};

	// public helpers: goNext / goPrev implementing clone-jump trick
	const goToNext = () => {
		if (isAnimating) return;
		setIsAnimating(true);

		// if currently at last real, first move to cloneFirst (domIndex = n+1) then jump to real first (domIndex = 1)
		if (logicalIndex === n - 1) {
			scrollToDomIndex(n + 1, true); // animate to cloned-first
			// after animation, jump without animation to real first
			setTimeout(() => {
				scrollToDomIndex(1, false);
				setLogicalIndex(0);
				setIsAnimating(false);
			}, animationDuration);
		} else {
			const nextLogical = logicalIndex + 1;
			scrollToDomIndex(nextLogical + 1, true); // domIndex = logical + 1 (because clone at start)
			setTimeout(() => {
				setLogicalIndex(nextLogical);
				setIsAnimating(false);
			}, animationDuration);
		}
	};

	const goToPrevious = () => {
		if (isAnimating) return;
		setIsAnimating(true);

		// if currently at first real, animate to cloneLast (domIndex = 0) then jump to real last (domIndex = n)
		if (logicalIndex === 0) {
			scrollToDomIndex(0, true); // animate to cloned-last
			setTimeout(() => {
				scrollToDomIndex(n, false); // jump to real last
				setLogicalIndex(n - 1);
				setIsAnimating(false);
			}, animationDuration);
		} else {
			const prevLogical = logicalIndex - 1;
			scrollToDomIndex(prevLogical + 1, true);
			setTimeout(() => {
				setLogicalIndex(prevLogical);
				setIsAnimating(false);
			}, animationDuration);
		}
	};

	// initial centering: scroll to domIndex = 1 (first real)
	useEffect(() => {
		const t = setTimeout(() => {
			scrollToDomIndex(1, false);
			setLogicalIndex(0);
		}, 50);
		return () => clearTimeout(t);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// on resize, recenter current logical index (jump without smooth)
	useEffect(() => {
		let raf = null;
		const onResize = () => {
			if (raf) cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => {
				// center to domIndex = logicalIndex + 1
				scrollToDomIndex(logicalIndex + 1, false);
			});
		};
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
			if (raf) cancelAnimationFrame(raf);
		};
	}, [logicalIndex]);

	// Add scroll event listener to update logicalIndex dynamically
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const onScroll = () => {
			const m = measure();
			if (!m) return;
			const { cardWidth, gap, centerOffset } = m;
			const stride = cardWidth + gap;
			const scrollLeft = container.scrollLeft + centerOffset;
			const newLogicalIndex = Math.round(scrollLeft / stride) - 1; // Adjust for clones

			if (newLogicalIndex >= 0 && newLogicalIndex < n && newLogicalIndex !== logicalIndex) {
				setLogicalIndex(newLogicalIndex);
			}
		};

		container.addEventListener("scroll", onScroll);
		return () => container.removeEventListener("scroll", onScroll);
	}, [logicalIndex, n]);

	// build DOM list with clones: [lastClone, ...projects, firstClone]
	const domList = [
		projects[projects.length - 1], // clone last at start
		...projects,
		projects[0], // clone first at end
	];

	return (
		<section id="projects" className="py-20 px-4 relative overflow-hidden bg-gradient-to-br from-background to-secondary/20">
			<div className="container mx-auto max-w-5xl">
				<div className="text-center mb-6 lg:mb-0">
					<h2 className="text-4xl md:text-5xl font-bold mb-7 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
						Featured <span className="text-primary">Projects</span>
					</h2>
					<p className="text-lg text-muted-foreground max-w-3xl mb-2 mx-auto leading-relaxed">
						Here are some of my recent projects. Each project was carefully crafted with attention to detail, performance, and user experience.
					</p>
				</div>

				<div className="relative">
					<button
						onClick={goToPrevious}
						disabled={isAnimating}
						className={`absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border border-border/50 transition-all duration-500 hover:bg-background hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
						aria-label="Previous project"
					>
						<ChevronLeft className="w-6 h-6 text-foreground" />
					</button>

					<button
						onClick={goToNext}
						disabled={isAnimating}
						className={`absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/95 backdrop-blur-sm shadow-xl border border-border/50 transition-all duration-500 hover:bg-background hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
						aria-label="Next project"
					>
						<ChevronRight className="w-6 h-6 text-foreground" />
					</button>

					{/* Scroll container */}
					<div
						ref={containerRef}
						className="flex gap-6 py-4 lg:gap-8 overflow-x-auto rounded-lg backdrop-blur-sm snap-x snap-mandatory scrollbar-hide lg:py-6 px-4 lg:px-8 bg-white/8 dark:bg-neutral-900/30 border border-neutral-200/5 dark:border-neutral-700/40"
						style={{
							scrollBehavior: 'smooth',
							webkitOverflowScrolling: 'touch',
						}}
						aria-live="polite"
					>
						{domList.map((project, idx) => {
							// idx 0 -> clone-last, idx n+1 -> clone-first
							const isClone = idx === 0 || idx === domList.length - 1;
							const uniqueKey = `${project.id}-${idx}-${isClone ? 'clone' : 'real'}`;
							return (
								<div
									key={uniqueKey}
									className="project-card flex-none w-[280px] lg:w-[350px] snap-center"
									style={{ scrollSnapAlign: 'center' }}
									aria-hidden={isClone ? true : false}
								>
									<div className="group bg-card/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-border/50 hover:border-primary/20 h-full flex flex-col">
										<div className="h-40 lg:h-48 overflow-hidden bg-gradient-to-br from-muted to-muted/70 relative">
											<img
												src={project.image}
												alt={project.title}
												className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
												draggable="false"
												onError={(e) => {
													e.target.src = `data:image/svg+xml;base64,${btoa(`
														<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
															<rect width="100%" height="100%" fill="#f1f5f9"/>
															<text x="50%" y="50%" font-family="system-ui" font-size="16" fill="#64748b" text-anchor="middle" dy=".3em">
																${project.title}
															</text>
														</svg>
													`)}`;
												}}
											/>
											<div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
										</div>

										<div className="p-5 lg:p-6 flex flex-col flex-1">
											<div className="flex flex-wrap gap-2 mb-3">
												{project.tags.map((tag, idx2) => (
													<span key={idx2} className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 transition-colors duration-300 hover:bg-primary/20">
														{tag}
													</span>
												))}
											</div>

											<h3 className="text-lg lg:text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
												{project.title}
											</h3>
											<p className="text-muted-foreground text-sm lg:text-base mb-1 line-clamp-3 leading-relaxed flex-1">
												{project.description}
											</p>

											<div className="flex justify-start gap-4 mt-auto pt-2">
												<a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105 group/link" onClick={(e) => e.stopPropagation()}>
													<ExternalLink className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
													<span>Live Demo</span>
												</a>
												<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-all duration-300 hover:scale-105 group/link" onClick={(e) => e.stopPropagation()}>
													<Github className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
													<span>Source Code</span>
												</a>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<div className="text-center mt-12 lg:mt-4">
					<a className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-l hover:shadow-primary/25" target="_blank" rel="noopener noreferrer" href="https://github.com/abdulkareem25">
						<span>View All Projects</span>
						<ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
					</a>
				</div>
			</div>

			<style jsx>{`
				.scrollbar-hide {
					-ms-overflow-style: none;
					scrollbar-width: none;
				}
				.scrollbar-hide::-webkit-scrollbar {
					display: none;
				}
				.snap-x {
					scroll-snap-type: x mandatory;
				}
				.snap-center {
					scroll-snap-align: center;
				}
				.line-clamp-3 {
					display: -webkit-box;
					-webkit-line-clamp: 3;
					-webkit-box-orient: vertical;
					overflow: hidden;
				}
				.project-card:focus-within {
					transform: translateY(-8px);
					box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
				}
			`}</style>
		</section>
	);
};
