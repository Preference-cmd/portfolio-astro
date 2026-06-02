import * as React from "react";
import { Linkedin } from "lucide-react";
import { getTranslations, type Locale } from "@/i18n";
import { getResume } from "@/data";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = getTranslations(locale);
  const resume = getResume(locale);
  const logo = resume.personalInfo?.logo || "SL";
  const brand = resume.personalInfo?.brand || "SYSTEM";
  const linkedin = resume.contact?.linkedin;
  const currentYear = new Date().getFullYear();

  const footer = t.footer as { description: string; copyright: string };

  // Normalise the LinkedIn handle: the user may store it as
  // "linkedin.com/in/x", "www.linkedin.com/in/x", or the full
  // "https://www.linkedin.com/in/x". We accept all three but must
  // never produce "https://www.www." (which 404s).
  const normalizeLinkedin = (raw: string | undefined): string | null => {
    if (!raw) return null;
    const trimmed = raw.replace(/^\/+/, "").trim();
    if (!trimmed) return null;
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };
  const linkedinHref = normalizeLinkedin(resume.contact?.linkedin);

  return (
    <footer className="border-t border-muted bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold tracking-tight">
              {logo} / {brand}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {footer.description}
            </span>
          </div>

          {linkedinHref && (
            <div className="flex items-center gap-6">
              <a
                href={linkedinHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-muted text-center text-xs font-mono text-muted-foreground uppercase tracking-wider">
          © {currentYear} {footer.copyright}
        </div>
      </div>
    </footer>
  );
}