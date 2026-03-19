import * as React from "react";
import { Github, Mail, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTranslations, type Locale } from "@/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);
  const currentYear = new Date().getFullYear();

  const footer = t.footer as { description: string; copyright: string };

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <p className="font-bold text-lg">SL</p>
            <p className="text-sm text-muted-foreground">
              {footer.description}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/Preference-cmd"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="mailto:noreply@example.com"
              className="p-3 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href="#"
              className="p-3 hover:bg-primary/10 border border-transparent hover:border-primary/30 transition-all"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t text-center text-sm text-muted-foreground">
          © {currentYear} {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
