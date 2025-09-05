import { useState } from "react";
import { cn } from "@/library/utils";

const skills = [
  // Frontend
  { name: "HTML/CSS", level: 95, category: "frontend" },
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "React", level: 90, category: "frontend" },
  { name: "TypeScript", level: 85, category: "frontend" },
  { name: "Tailwind CSS", level: 90, category: "frontend" },
  { name: "Next.js", level: 80, category: "frontend" },

  // Backend
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Express", level: 75, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "PostgreSQL", level: 65, category: "backend" },
  { name: "GraphQL", level: 60, category: "backend" },

  // Tools
  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Figma", level: 85, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-20 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        {/* Categories: horizontally scrollable on small screens */}
        <div className="-mx-4 mb-12">
          <div className="overflow-x-auto hide-scrollbar px-4 py-2 md:overflow-visible">
            <div className="inline-flex md:flex md:flex-wrap md:justify-center gap-4 items-center">
              {categories.map((category, key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-5 py-2 rounded-full transition-colors duration-300 capitalize flex-shrink-0",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/70 text-forefround hover:bd-secondary"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable area that shows ~3 rows initially */}
        <div
          className={cn(
            // responsive height optimized for ~6" phones and up
            "overflow-y-auto hide-scrollbar backdrop-blur-sm rounded-lg px-4",
            "h-[55vh] md:h-[481px]",
            // light / dark-friendly background and subtle border for contrast
            "bg-white/8 dark:bg-neutral-900/30 border border-neutral-200/5 dark:border-neutral-700/40"
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          aria-label="Skills list (scrollable)"
        >
          {/* Group skills into rows of 3 so we can center incomplete rows */}
          {(() => {
            const rows = [];
            for (let i = 0; i < filteredSkills.length; i += 3) {
              rows.push(filteredSkills.slice(i, i + 3));
            }
            return rows.map((row, rowIndex) => {
              const emptySlots = 3 - row.length;
              const leftPlaceholders = Math.floor(emptySlots / 2);
              const rightPlaceholders = emptySlots - leftPlaceholders;

              // Use flex for all rows and give each card a fixed, non-shrinking width of 220px
              const rowWrapperClass = "flex justify-center gap-4 my-4 flex-wrap";

              // fixed width 220px as requested; slightly smaller gaps for mobile
              const cardClass =
                "bg-card p-4 rounded-lg shadow-xs card-hover min-h-[10vh] md:h-[135px] w-[60vw] md:w-[290px] flex-shrink-0";

              return (
                <div key={rowIndex} className={rowWrapperClass}>
                  {row.map((skill, key) => (
                    <div key={key} className={cardClass}>
                      <div className="text-left mb-4">
                        <h3 className="font-semibold text-lg"> {skill.name}</h3>
                      </div>
                      <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                          style={{ width: skill.level + "%" }}
                        />
                      </div>

                      <div className="text-right mt-1">
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            });
          })()}
        </div>
      </div>
    </section>
  );
};