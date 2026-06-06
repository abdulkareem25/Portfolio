import { Briefcase, Code, Download, Mail, User } from "lucide-react";

/* ─── What I do cards data ──────────────────────────────────── */
const EXPERTISE = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Building responsive, accessible, and performant web apps with modern frameworks and best practices.",
  },
  {
    icon: User,
    title: "UI / UX Design",
    description:
      "Crafting intuitive interfaces and seamless experiences that users actually enjoy.",
  },
  {
    icon: Briefcase,
    title: "Project Management",
    description:
      "Driving projects from conception to completion with agile methodologies and clear communication.",
  },
];

/* ─── Shared label style (same as ContactSection) ───────────── */
const sectionLabel =
  "text-xs font-semibold text-foreground/50 uppercase tracking-widest";

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Ambient glow — mirrors ContactSection */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            A developer who loves turning complex ideas into clean, elegant
            products. Always learning, always building.
          </p>
        </div>

        {/* ── Two equal columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* ── Left: bio + actions ── */}
          <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg flex flex-col justify-between h-full gap-8">

            {/* Bio block */}
            <div className="flex flex-col gap-5">
              <p className={sectionLabel}>Who I Am</p>
              <h3 className="text-xl font-semibold text-foreground leading-snug">
                Passionate Web Developer &amp; Tech Creator
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed py-2">
                With over 5 years of experience in web development, I specialize
                in building responsive, accessible, and performant applications
                using modern technologies.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed py-2">
                I&apos;m driven by elegant solutions to complex problems and
                constantly push to stay at the forefront of the ever-evolving
                web landscape.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-border/40" />

            {/* CTA block */}
            <div className="flex flex-col items-center gap-4">
              <p className={sectionLabel}>Let&apos;s Work Together</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] active:scale-95 transition-all duration-300"
                >
                  <Mail size={15} />
                  Get In Touch
                </a>
                <a
                  href="https://drive.google.com/file/d/16PlR4360p4FmzUXt7DWRqVPtvr11UoJB/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold border border-primary/50 text-primary bg-primary/15 hover:bg-primary/25 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.03] active:scale-95 transition-all duration-300"
                >
                  <Download size={15} />
                  Download Resume
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: expertise cards ── */}
          <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg flex flex-col justify-between h-full">

            <p className={sectionLabel + " mb-6"}>What I Do</p>

            <div className="flex flex-col gap-5 flex-1">
              {EXPERTISE.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/40 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 group"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-200">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider mb-1">
                      {title}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
