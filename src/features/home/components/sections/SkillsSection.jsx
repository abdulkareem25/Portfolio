import { cn } from "@/app/utils";
import { useState } from "react";
import {
  FileCode, Atom, Wind, Palette, Layers,
  Server, ServerCog, Network, ShieldCheck, Activity,
  Database, DatabaseZap, Leaf,
  Link, BrainCircuit, Bot,
  Github, Cloud, Coffee, Box, Code, PenTool, Send, Zap, CheckCircle
} from "lucide-react";

/* ── Static skills data ──────────────────────────────────────── */
const MAIN_SKILLS = [
  {
    id: "frontend",
    label: "FRONTEND",
    skills: [
      { name: "React", icon: Atom },
      { name: "Redux Toolkit", icon: Layers },
      { name: "JavaScript", icon: FileCode },
      { name: "Tailwind CSS", icon: Wind },
      { name: "SCSS", icon: Palette },
    ]
  },
  {
    id: "backend",
    label: "BACKEND",
    skills: [
      { name: "Node.js", icon: Server },
      { name: "Express.js", icon: ServerCog },
      { name: "REST APIs", icon: Network },
      { name: "Authentication & Authorization", icon: ShieldCheck },
      { name: "Redis", icon: DatabaseZap },
      { name: "Socket.io", icon: Activity },
      { name: "Express Validator", icon: CheckCircle },
    ]
  },
  {
    id: "database",
    label: "DATABASE",
    skills: [
      { name: "MongoDB", icon: Database },
      { name: "Mongoose", icon: Leaf },
      { name: "MySQL", icon: DatabaseZap },
    ]
  },
  {
    id: "ai",
    label: "AI & LLM",
    skills: [
      { name: "LangChain", icon: Link },
      { name: "RAG", icon: BrainCircuit },
      { name: "Vector Databases", icon: Database },
      { name: "LLM Integration", icon: Bot },
    ]
  },
  {
    id: "tools",
    label: "TOOLS",
    skills: [
      { name: "Git & GitHub", icon: Github },
      { name: "Docker", icon: Box },
      { name: "Postman", icon: Send },
      { name: "VS Code", icon: Code },
      { name: "Figma", icon: PenTool },
      { name: "Render", icon: Cloud },
      { name: "Vite", icon: Zap },
    ]
  }
];

const ALSO_COMFORTABLE = [
  { name: "TypeScript", icon: FileCode },
  { name: "Python", icon: FileCode },
  { name: "Java", icon: Coffee },
];

const TABS = ["all", "frontend", "backend", "database", "ai", "tools"];

export const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState("all");

  const groupsToRender = activeTab === "all"
    ? MAIN_SKILLS
    : MAIN_SKILLS.filter(g => g.id === activeTab);

  return (
    <section id="skills" className="py-28 px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10 flex flex-col items-center">

        {/* ── Section header ── */}
        <div className="text-center mb-14 w-full">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-[1.1]">
            My <span className="text-muted-foreground">Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            The tools, languages, and frameworks I use to bring ideas to life. Constantly learning and evolving.
          </p>
        </div>

        <div className="w-full">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-10 border-b border-border/30 pb-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "text-sm md:text-base font-semibold capitalize transition-colors duration-300 relative group py-2",
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {tab === "ai" ? "AI & LLM" : tab}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-[2px] transition-all duration-300 rounded-full opacity-80",
                    activeTab === tab ? "bg-foreground w-full" : "bg-foreground/50 w-0 group-hover:w-full"
                  )}
                />
              </button>
            ))}
          </div>

          {/* Skills Groups */}
          <div className="flex flex-col gap-8 md:gap-10">
            {groupsToRender.map((group) => (
              <div key={group.id} className="flex flex-col gap-4 group/section relative">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <h3 className="text-lg md:text-xl font-extrabold tracking-wider text-foreground/50 uppercase transition-colors group-hover/section:text-primary">
                    {group.label}
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {group.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className={cn(
                          "flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 rounded-full",
                          "bg-card/60 border border-border/50 backdrop-blur-md",
                          "transition-all duration-300 group/skill",
                          "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50 hover:bg-card/80 cursor-default"
                        )}
                      >
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover/skill:text-foreground transition-transform duration-300 group-hover/skill:scale-110" />
                        <span className="text-sm md:text-base font-semibold text-foreground/90 group-hover/skill:text-foreground transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Also comfortable with */}
            {activeTab === "all" && (
              <div className="flex flex-col gap-4 mt-6 group/section">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <h3 className="text-lg md:text-xl font-extrabold tracking-wider text-foreground uppercase transition-colors group-hover/section:text-primary/90">
                    Also Comfortable With
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {ALSO_COMFORTABLE.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className={cn(
                          "flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 rounded-full",
                          "bg-card/40 border border-border/30 backdrop-blur-md opacity-85",
                          "transition-all duration-300 group/skill",
                          "hover:opacity-100 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 hover:border-primary/40 hover:bg-card/60 cursor-default"
                        )}
                      >
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground group-hover/skill:text-primary transition-transform duration-300 group-hover/skill:scale-110" />
                        <span className="text-sm md:text-base font-semibold text-foreground/80 group-hover/skill:text-foreground transition-colors duration-300">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

