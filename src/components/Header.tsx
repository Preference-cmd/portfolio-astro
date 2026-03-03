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
  { key: "navigation.projects", href: "/#projects", sectionId: "projects" },
  { key: "navigation.experience", href: "/#experience", sectionId: "experience" },
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href={`/${locale === "zh" ? "zh" : ""}`} className="text-xl font-bold">
            SL
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`/${locale === "zh" ? "zh" : ""}${item.href}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-2",
                  isNavActive(item) ? "text-primary font-semibold" : "text-muted-foreground"
                )}
              >
                {getNavLabel(item.key)}
                {isNavActive(item) && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full transition-all" />
                )}
              </a>
            ))}
          </nav>

          {/* Right side - Theme & Language */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Language Toggle */}
            <a
              href={locale === "en" ? "/zh" : "/"}
              className="text-sm font-medium px-2 py-1 rounded hover:bg-accent transition-colors"
            >
              {locale === "en" ? "中" : "EN"}
            </a>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`/${locale === "zh" ? "zh" : ""}${item.href}`}
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-primary",
                  isNavActive(item) ? "text-primary font-semibold" : "text-muted-foreground",
                  isNavActive(item) ? "bg-primary/5 pl-2 border-l-2 border-primary" : "pl-2 border-l-2 border-transparent"
                )}
                onClick={() => setIsOpen(false)}
              >
                {getNavLabel(item.key)}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
