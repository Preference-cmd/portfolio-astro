import * as React from "react";
import { Github, Mail } from "lucide-react";
import { getTranslations, type Locale } from "@/i18n";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);
  const currentYear = new Date().getFullYear();

  const footer = t.footer as { description: string; copyright: string };

  return (
    <footer className="border-t border-muted bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-tight uppercase">
              SL / SYSTEM
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {footer.description}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Preference-cmd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="mailto:noreply@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-muted text-center text-xs font-mono text-muted-foreground uppercase tracking-wider">
          © {currentYear} {footer.copyright}
        </div>
      </div>
    </footer>
  );
}