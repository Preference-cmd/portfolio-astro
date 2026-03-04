import * as React from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { getTranslations, type Locale } from "@/i18n";

interface HeaderProps {
  locale: Locale;
}

const navItems = [
  { key: "navigation.home", href: "/" },
  { key: "navigation.about", href: "/#about", sectionId: "about" },
  { key: "navigation.experience", href: "/#experience", sectionId: "experience" },
  { key: "navigation.projects", href: "/#projects", sectionId: "projects" },
  { key: "navigation.contact", href: "/#contact", sectionId: "contact" },
];

export function Header({ locale }: HeaderProps) {
  const t = getTranslations(locale);
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState<string>("");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Clear active section if scrolled to the very top
      if (window.scrollY < 100) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when the section reaches top 20%-30% of viewport
      }
    );

    const sectionIds = navItems.filter(item => item.sectionId).map(item => `#${item.sectionId}`);
    if (sectionIds.length === 0) return;

    const sections = document.querySelectorAll(sectionIds.join(", "));
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getNavLabel = (key: string): string => {
    const nav = t.navigation as Record<string, string>;
    return nav?.[key.replace('navigation.', '')] || key;
  };

  const isNavActive = (item: typeof navItems[0]) => {
    if (item.href === "/" && !activeSection) return true;
    return item.sectionId === activeSection;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-muted",
        scrolled
          ? "bg-background/95 backdrop-blur-sm shadow-[0_4px_0_0_rgba(0,0,0,1)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.05)]"
          : "bg-background"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href={`/${locale === "zh" ? "zh" : ""}`} className="text-2xl font-black tracking-tighter uppercase relative group flex items-center">
            <span className="bg-primary text-primary-foreground px-2 py-1 mr-2 grid-bg">
              SL
            </span>
            <span className="hidden sm:inline-block">/ SYSTEM</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const active = isNavActive(item);
              return (
                <a
                  key={item.key}
                  href={`/${locale === "zh" ? "zh" : ""}${item.href}`}
                  className={cn(
                    "text-xs font-mono uppercase tracking-widest px-4 py-2 transition-all border",
                    active
                      ? "bg-primary text-primary-foreground border-primary font-bold shadow-[2px_2px_0_0_currentColor]"
                      : "border-transparent text-muted-foreground hover:border-muted hover:bg-muted/10"
                  )}
                >
                  {active ? `[ ${getNavLabel(item.key)} ]` : getNavLabel(item.key)}
                </a>
              );
            })}
          </nav>

          {/* Right side - Theme & Language */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />

            {/* Language Toggle */}
            <a
              href={locale === "en" ? "/zh" : "/"}
              className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest px-3 py-2 border border-muted hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-crosshair font-bold"
            >
              {locale === "en" ? "中/EN" : "EN/中"}
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden rounded-none border-muted hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-muted bg-background grid grid-cols-1 divide-y divide-muted">
            {navItems.map((item) => {
              const active = isNavActive(item);
              return (
                <a
                  key={item.key}
                  href={`/${locale === "zh" ? "zh" : ""}${item.href}`}
                  className={cn(
                    "block py-4 px-4 text-xs font-mono uppercase tracking-widest transition-colors",
                    active
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {active ? `> ${getNavLabel(item.key)}` : getNavLabel(item.key)}
                </a>
              );
            })}
            <a
              href={locale === "en" ? "/zh" : "/"}
              className="block py-4 px-4 text-xs font-mono uppercase tracking-widest transition-colors text-muted-foreground hover:bg-muted/50 hover:text-foreground sm:hidden"
            >
              Language: {locale === "en" ? "中文 / ZH" : "English / EN"}
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
