import { cn } from "@/app/utils";
import { useEffect, useState } from "react";
import { getSkills } from "../../services/api";

export const SkillsSection = () => {
  const [categories, setCategories] = useState(["All"]);
  const [skillGroups, setSkillGroups] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await getSkills();
        const groups = response.data.skills;

        setSkillGroups(groups);

        // Derive category tabs dynamically from the API data
        const derived = ["All", ...groups.map((g) => g.category)];
        setCategories(derived);
      } catch (err) {
        console.error("Error Fetching skills: ", err);
      }
    };
    fetchSkills();
  }, []);

  // Flatten skillsList items for display, filtered by active category
  const filteredSkills =
    activeCategory === "All"
      ? skillGroups.flatMap((g) =>
        g.skillsList.map((s) => ({ ...s, category: g.category }))
      )
      : skillGroups
        .filter((g) => g.category === activeCategory)
        .flatMap((g) =>
          g.skillsList.map((s) => ({ ...s, category: g.category }))
        );

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="text-primary/60">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            The tools, languages, and frameworks I use to bring ideas to life. Constantly learning and evolving.
          </p>
        </div>

        {/* Categories */}
        <div className="-mx-4 mb-10 md:mb-12">
          <div className="overflow-x-auto hide-scrollbar px-4 py-2 md:overflow-visible">
            <div className="inline-flex md:flex md:flex-wrap md:justify-center gap-3 items-center">
              {categories.map((category, key) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "group inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-sm",
                    activeCategory === category
                      ? "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30 border border-primary/20"
                      : "bg-card/60 backdrop-blur-md border border-border/50 text-foreground/80 hover:bg-primary/10 hover:border-primary/50 hover:text-primary"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div
          className={cn(
            "overflow-y-auto themed-scrollbar backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-border/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative z-10",
            "h-[50vh] sm:h-[55vh] md:h-[520px]",
            "bg-card/30"
          )}
          aria-label="Skills list (scrollable)"
        >
          {filteredSkills.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 p-8 shadow-sm">
              No skills found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSkills.map((skill, key) => (
                <div
                  key={key}
                  className="bg-card/60 backdrop-blur-md p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/40 flex flex-col justify-between group h-[120px]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="min-w-0 pr-2">
                      <h3 className="font-bold text-base leading-tight text-foreground group-hover:text-primary transition-colors truncate">
                        {skill.name}
                      </h3>
                      <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mt-1 block truncate">
                        {skill.category}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg shrink-0 border border-primary/20">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-background/50 h-2 rounded-full overflow-hidden border border-border/30 mt-auto">
                    <div
                      className="bg-gradient-to-r from-primary/80 to-primary h-full rounded-full origin-left animate-[grow_1.5s_ease-out] shadow-[0_0_10px_rgba(var(--primary),0.4)] transition-all duration-500"
                      style={{ width: skill.level + "%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
