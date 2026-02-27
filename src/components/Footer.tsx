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
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Preference-cmd"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href="mailto:sq103832@outlook.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
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
