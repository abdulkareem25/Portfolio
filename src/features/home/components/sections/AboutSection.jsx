import { Code, ExternalLink, Globe, Sparkles } from "lucide-react";

const WhatsappIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);
import { cn } from "@/app/utils";

/* ─── What I do cards data ──────────────────────────────────── */
const EXPERTISE = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Building responsive, user-friendly web applications with clean structure and smooth functionality.",
  },
  {
    icon: Code,
    title: "Full-Stack Product Building",
    description:
      "Turning ideas into complete products, from planning and architecture to deployment.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Applications",
    description:
      "Exploring practical AI use cases like conversational systems, retrieval, and memory-driven experiences.",
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-28 px-4 relative overflow-hidden">
      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/6 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-[1.1]">
            About <span className="text-muted-foreground">Me</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            A developer who turns ideas into reliable digital products. Always building, always improving.
          </p>
        </div>

        {/* ── Two equal columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

          {/* ── Left: bio + actions ── */}
          <div
            className={cn(
              "bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg",
              "flex flex-col justify-between h-full gap-8",
              "transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            )}
          >
            {/* Bio block */}
            <div className="flex flex-col gap-5">
              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">
                Who I Am
              </p>
              <h3 className="text-xl font-semibold text-foreground leading-snug">
                Full-Stack Developer
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m Abdul Kareem, a developer from Chennai who enjoys building
                practical web applications from idea to deployment. Over the past
                year, I&apos;ve worked on hands-on projects that strengthened my
                skills in frontend, backend, authentication, deployment, and
                AI-powered application development.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I care about clean structure, solid functionality, and creating
                work that feels useful in the real world.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-border/40" />

            {/* CTA block */}
            <div className="flex flex-col items-center gap-4 w-full">
              <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">
                Let&apos;s Work Together
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {/* Get In Touch */}
                <a
                  href="https://wa.me/+917305680655"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl font-semibold text-sm",
                    "bg-card/70 border border-border/50 backdrop-blur-md",
                    "transition-all duration-300",
                    "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 hover:bg-card/80",
                    "overflow-hidden"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <WhatsappIcon className="relative w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="relative text-foreground/80 group-hover:text-foreground transition-colors">
                    Get In Touch
                  </span>
                </a>

                {/* View Resume */}
                <a
                  href="https://drive.google.com/file/d/1qlZZ2SKcGUpSiesv7WXGz3Pq14q5VGyW/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "group relative flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-2xl font-semibold text-sm",
                    "bg-card/60 border border-border/50 backdrop-blur-md",
                    "transition-all duration-300",
                    "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40 hover:bg-card/80",
                    "overflow-hidden"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <ExternalLink className="relative w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span className="relative text-muted-foreground group-hover:text-foreground transition-colors">
                    View Resume
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* ── Right: expertise cards ── */}
          <div
            className={cn(
              "bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg",
              "flex flex-col h-full",
              "transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
            )}
          >
            <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-6">
              What I Do
            </p>

            <div className="flex flex-col gap-4 flex-1 justify-between">
              {EXPERTISE.map(
                // eslint-disable-next-line no-unused-vars
                ({ icon: IconComponent, title, description }) => (
                <div
                  key={title}
                  className={cn(
                    "group flex items-start gap-4 p-5 rounded-2xl",
                    "bg-background/40 border border-border/40 backdrop-blur-sm",
                    "transition-all duration-300",
                    "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:bg-card/60",
                    "relative overflow-hidden"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  {/* Icon bubble */}
                  <div
                    className={cn(
                      "relative shrink-0 w-11 h-11 rounded-xl hidden sm:flex items-center justify-center mt-0.5",
                      "bg-background/60 border border-border/40",
                      "group-hover:border-primary/30 group-hover:bg-primary/5",
                      "transition-all duration-300"
                    )}
                  >
                    <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                  </div>

                  <div className="relative text-left min-w-0">
                    <p className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest mb-1.5">
                      {title}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
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
