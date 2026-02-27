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
  { key: "navigation.about", href: "/#about" },
  { key: "navigation.projects", href: "/#projects" },
  { key: "navigation.experience", href: "/#experience" },
  { key: "navigation.contact", href: "/#contact" },
];

export function Header({ locale }: HeaderProps) {
  const t = getTranslations(locale);
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNavLabel = (key: string): string => {
    const nav = t.navigation as Record<string, string>;
    return nav?.[key.replace('navigation.', '')] || key;
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
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {getNavLabel(item.key)}
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
                className="block py-2 text-sm font-medium transition-colors hover:text-primary"
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
