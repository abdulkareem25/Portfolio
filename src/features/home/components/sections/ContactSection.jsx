import { cn } from "@/app/utils";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

/* ─── WhatsApp SVG Logo ─────────────────────────────────────── */
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

/* ─── Data ──────────────────────────────────────────────────── */
const PERSONAL_LINKS = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdulkareem25/",
    label: "LinkedIn",
    sublabel: "Let's connect",
  },
  {
    icon: Github,
    href: "https://github.com/abdulkareem25/",
    label: "GitHub",
    sublabel: "View my code",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:abdulkareemzahir9599@gmail.com",
    sublabel: "Send a mail",
  },
  {
    icon: MapPin,
    label: "Location",
    href: "https://maps.google.com/?q=Vandavasi,Tamil+Nadu,India",
    sublabel: "Vandavasi, TN",
  },
];

/* ─── Component ─────────────────────────────────────────────── */
export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="py-28 px-4 relative overflow-hidden"
    >
      {/* ── Ambient glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/6 rounded-full blur-3xl opacity-40" />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10 flex flex-col items-center">

        {/* ── Section header ── */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-5 tracking-tight leading-[1.1]">
            Get In{" "}
            <span className="text-muted-foreground">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg leading-relaxed">
            Have a project in mind or want to collaborate?{" "}
            I&apos;m always open to new opportunities reach out and I&apos;ll get back to you fast.
          </p>
        </div>

        {/* ── WhatsApp CTA card ── */}
        <div className="w-full max-w-md mb-14">
          <a
            href="https://wa.me/+917305680655"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative flex items-center gap-2 lg:gap-7 w-full px-7 py-5 rounded-2xl",
              "bg-card/70 border border-border/50 backdrop-blur-md",
              "transition-all duration-300 ease-out",
              "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/15 hover:border-primary/40"
            )}
          >
            {/* hover gradient overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* icon bubble */}
            <div className="relative shrink-0 w-14 h-14 rounded-xl bg-background/60 border border-border/50 group-hover:border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/5">
              <WhatsappIcon className="w-7 h-7 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
            </div>

            {/* text */}
            <div className="relative flex flex-col min-w-0">
              <span className="font-bold text-base md:text-lg text-foreground tracking-tight leading-tight">
                Text on WhatsApp
              </span>
              <span className="text-sm text-muted-foreground mt-0.5">
                Quick reply · usually within a few hours
              </span>
            </div>
          </a>
        </div>

        {/* ── Divider with label ── */}
        <div className="flex items-center gap-4 w-full max-w-md mb-10">
          <div className="flex-1 h-px bg-border/40" />
          <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest whitespace-nowrap">
            Or find me on
          </span>
          <div className="flex-1 h-px bg-border/40" />
        </div>

        {/* ── Social links grid ── */}
        <div className="grid grid-cols-4 gap-3 md:gap-4 w-full max-w-md">
          {PERSONAL_LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.label}
                style={{ animationDelay: `${i * 60}ms` }}
                className={cn(
                  "group flex flex-col items-center justify-center gap-2 p-4 sm:py-4 sm:px-2 rounded-2xl",
                  "bg-card/60 border border-border/50 backdrop-blur-md",
                  "transition-all duration-300",
                  "hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/40 hover:bg-card/80",
                  "relative overflow-hidden"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                <div className="relative w-10 h-10 rounded-xl bg-background/50 border border-border/40 group-hover:border-primary/30 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/5">
                  <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                </div>
                <div className="relative text-center leading-tight hidden sm:block">
                  <div className="text-xs font-semibold text-foreground/80 group-hover:text-foreground transition-colors">
                    {link.label}
                  </div>
                  <div className="text-[10px] text-muted-foreground/70 mt-0.5">
                    {link.sublabel}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
};
