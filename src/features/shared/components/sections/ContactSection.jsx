import { cn } from "@/app/utils";
import { sendContactMessage } from "@/features/shared/services/contact.api";
import {
  CheckCircle,
  Github,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
  XCircle,
} from "lucide-react";
import { useRef, useState } from "react";

/* ─── Data ──────────────────────────────────────────────────── */
const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "abdulkareemzahir9599@gmail.com",
    href: "mailto:abdulkareemzahir9599@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 7305680655",
    href: "tel:+917305680655",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Vandavasi, TN, India",
    href: "https://maps.google.com/?q=Vandavasi,Tamil+Nadu,India",
  },
];

const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abdulkareem25/",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/abdulkareem_25/",
    label: "Instagram",
  },
  {
    icon: Github,
    href: "https://github.com/abdulkareem25/",
    label: "GitHub",
  },
];

/* ─── Shared label style (matches "CONNECT WITH ME") ────────── */
const sectionLabel =
  "text-xs font-semibold text-foreground/50 uppercase tracking-widest";

/* ─── Field wrapper ─────────────────────────────────────────── */
const Field = ({ label, id, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold text-foreground/50 uppercase tracking-widest">
      {label}
    </label>
    {children}
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1 animate-fade-in">
        <XCircle size={12} /> {error}
      </p>
    )}
  </div>
);

const inputBase =
  "w-full px-4 py-3 rounded-xl border bg-white/5 dark:bg-white/[0.04] backdrop-blur-sm " +
  "border-border/60 text-foreground placeholder:text-foreground/30 " +
  "focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/50 " +
  "transition-all duration-200 hover:border-primary/30 text-sm";

/* ─── Component ─────────────────────────────────────────────── */
export const ContactSection = () => {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    else if (formData.name.length > 100) e.name = "Max 100 characters";

    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter a valid email address";

    if (formData.subject && formData.subject.length > 150)
      e.subject = "Max 150 characters";

    if (!formData.message.trim()) e.message = "Message is required";
    else if (formData.message.trim().length < 10)
      e.message = "Must be at least 10 characters";
    else if (formData.message.length > 2000) e.message = "Max 2000 characters";

    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setStatus("loading");
    try {
      await sendContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim() || undefined,
        message: formData.message.trim(),
      });
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
    } catch (err) {
      setStatus("error");
      const msg =
        err?.response?.data?.errors?.[0]?.msg ||
        err?.response?.data?.message ||
        "Something went wrong. Please try again.";
      setServerError(msg);
    }
  };

  const resetStatus = () => setStatus("idle");

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* ── Section header ── */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="text-primary/60">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Have a project in mind or want to collaborate? I&apos;m always open
            to new opportunities. Drop me a message and I&apos;ll get back to
            you shortly.
          </p>
        </div>

        {/* ── Two equal columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* ── Left: single unified card ── */}
          <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg flex flex-col justify-between h-full">

            {/* Contact info block */}
            <div className="flex flex-col gap-5">
              <p className={sectionLabel}>Contact Information</p>
              {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="flex-shrink-0 p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all duration-200">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider mb-0.5">
                      {label}
                    </p>
                    <p className="text-sm text-foreground/80 group-hover:text-primary transition-colors duration-200 truncate">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-border/40" />

            {/* Social block */}
            <div className="flex flex-col items-center gap-4">
              <p className={sectionLabel}>Connect With Me</p>
              <div className="flex gap-3 justify-center">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 border border-primary/50 text-primary hover:bg-gradient-to-br hover:from-primary hover:via-primary hover:to-primary/90 hover:text-primary-foreground hover:border-primary hover:scale-110 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 shadow-sm"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: form card ── */}
          <div className="bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl p-8 shadow-lg h-full flex flex-col">

            <p className={cn(sectionLabel, "mb-6")}>Send a Message</p>

            {/* Success state */}
            {status === "success" && (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <CheckCircle className="text-green-400" size={28} />
                </div>
                <p className="text-base font-semibold text-foreground">
                  Message Sent!
                </p>
                <p className="text-sm text-muted-foreground max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={resetStatus}
                  className="mt-1 text-xs text-primary hover:underline underline-offset-2"
                >
                  Send another message →
                </button>
              </div>
            )}

            {status !== "success" && (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-4 flex-1"
              >
                {/* Server error */}
                {status === "error" && serverError && (
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
                    <XCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                {/* Name + Email side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" id="name" error={errors.name}>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Abdul Kareem"
                      autoComplete="name"
                      className={cn(
                        inputBase,
                        errors.name && "border-red-500/60 focus:ring-red-500/40"
                      )}
                    />
                  </Field>

                  <Field label="Email Address *" id="email" error={errors.email}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className={cn(
                        inputBase,
                        errors.email &&
                        "border-red-500/60 focus:ring-red-500/40"
                      )}
                    />
                  </Field>
                </div>

                {/* Subject */}
                <Field label="Subject (Optional)" id="subject" error={errors.subject}>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={cn(
                      inputBase,
                      errors.subject &&
                      "border-red-500/60 focus:ring-red-500/40"
                    )}
                  />
                </Field>

                {/* Message — grows to fill remaining height */}
                <Field label="Message *" id="message" error={errors.message}>
                  <div className="relative flex-1">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Hi Abdul, I'd love to discuss..."
                      className={cn(
                        inputBase,
                        "resize-none hide-scrollbar w-full",
                        errors.message &&
                        "border-red-500/60 focus:ring-red-500/40"
                      )}
                    />
                    <span
                      className={cn(
                        "absolute bottom-2.5 right-3 text-xs pointer-events-none transition-colors duration-200",
                        formData.message.length > 1800
                          ? "text-red-400"
                          : "text-foreground/30"
                      )}
                    >
                      {formData.message.length}/2000
                    </span>
                  </div>
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  id="contact-submit-btn"
                  disabled={status === "loading"}
                  className={cn(
                    "group mt-auto w-full flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm",
                    "bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground",
                    "shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03]",
                    "active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100",
                    "transition-all duration-300"
                  )}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send
                        size={15}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
