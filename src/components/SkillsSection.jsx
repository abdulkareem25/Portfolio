import { useEffect, useState } from "react";
import { cn } from "@/library/utils";
import { getSkills } from "../services/api";

// const skills = [
//   // Frontend
//   { name: "HTML/CSS", level: 95, category: "frontend" },
//   { name: "JavaScript", level: 90, category: "frontend" },
//   { name: "React", level: 90, category: "frontend" },
//   { name: "TypeScript", level: 85, category: "frontend" },
//   { name: "Tailwind CSS", level: 90, category: "frontend" },
//   { name: "Next.js", level: 80, category: "frontend" },

//   // Backend
//   { name: "Node.js", level: 80, category: "backend" },
//   { name: "Express", level: 75, category: "backend" },
//   { name: "MongoDB", level: 70, category: "backend" },
//   { name: "MongoDB", level: 70, category: "backend" },
//   { name: "MongoDB", level: 70, category: "backend" },
//   { name: "PostgreSQL", level: 65, category: "backend" },
//   { name: "GraphQL", level: 60, category: "backend" },

//   // Tools
//   { name: "Git/GitHub", level: 90, category: "tools" },
//   { name: "Docker", level: 70, category: "tools" },
//   { name: "Figma", level: 85, category: "tools" },
//   { name: "VS Code", level: 95, category: "tools" },
// ];


export const SkillsSection = () => {

  const [categories, setCategories] = useState([
    "All",
    "Frontend",
    "Backend",
    "Tools",
    "Soft Skills",
    "Others"
  ]);
  const [skills, setSkills] = useState([])
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();

        setSkills(response.data)
        console.log(response.data)

      } catch (err) {
        console.error("Error Fetching skills: ", err)
      }
    }
    fetchSkills()
  }, [])


  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-20 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 md:mb-9 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        {/* Categories */}
        <div className="-mx-4 mb-12 md:mb-7">
          <div className="overflow-x-auto hide-scrollbar px-4 py-2 md:overflow-visible">
            <div className="inline-flex md:flex md:flex-wrap md:justify-center gap-4 items-center">
              {categories.map((category, key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "group inline-flex cursor-pointer items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-l hover:shadow-primary/25",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/70 text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div
          className={cn(
            "overflow-y-auto hide-scrollbar backdrop-blur-sm rounded-lg px-4",
            "h-[60vh] md:h-[481px]",
            "bg-gradient-to-br from-background/20 to-muted/20"
          )}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          aria-label="Skills list (scrollable)"
        >
          {/* Group skills */}
          {(() => {
            const rows = [];
            for (let i = 0; i < filteredSkills.length; i += 3) {
              rows.push(filteredSkills.slice(i, i + 3));
            }
            return rows.map((row, rowIndex) => {
              return (
                <div key={rowIndex} className="flex justify-center gap-5 my-5 flex-wrap">
                  {row.map((skill, key) => (
                    <div key={key} className="bg-card p-4 rounded-lg shadow-xs card-hover min-h-[10vh] md:h-[115px] w-[60vw] md:w-[275px] flex-shrink-0">
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