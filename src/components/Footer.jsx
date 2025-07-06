import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="p-4 bg-card relative border-t border-border flex flex-wrap justify-center items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()} AbdulKareem.co. All rights reserved.
      </p>
      <a
        href="#hero"
        className="fixed bottom-2.5 right-2.5 p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};