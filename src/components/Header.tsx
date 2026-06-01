import * as React from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ColorBar } from "@/components/ui/color-bar";
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
  const [hidden, setHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY < 100) setActiveSection("");

      // Hide on scroll down, show on scroll up
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      { rootMargin: "-20% 0px -70% 0px" }
    );

    navItems.filter((i) => i.sectionId).forEach((item) => {
      const el = document.getElementById(item.sectionId!);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const getNavLabel = (key: string): string => {
    const nav = t.navigation as Record<string, string>;
    return nav?.[key.replace('navigation.', '')] || key;
  };

  const getHref = (item: typeof navItems[0]) => {
    if (item.href === "/") {
      return locale === "zh" ? "/zh" : "/";
    }
    return locale === "zh" ? `/zh${item.href}` : item.href;
  };

  const [pathname, setPathname] = React.useState("");

  React.useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isNavActive = (item: typeof navItems[0]) => {
    const isHomePage = pathname === '/' || pathname === '/zh' || pathname === '/zh/';
    if (!isHomePage) return false;
    if (item.href === "/") return !activeSection;
    return activeSection === item.sectionId;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    const isHomePage = window.location.pathname === '/' || window.location.pathname === '/zh' || window.location.pathname === '/zh/';

    if (isHomePage && item.sectionId) {
      e.preventDefault();
      const element = document.getElementById(item.sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
        window.history.pushState(null, '', getHref(item));
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <ColorBar />
      <div className="border-b border-muted bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex h-[54px] items-center justify-between">
            {/* Logo */}
            <a href={`/${locale === "zh" ? "zh" : ""}`} className="text-sm font-semibold tracking-tight uppercase">
              SL / SYSTEM
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const active = isNavActive(item);
                return (
                  <a
                    key={item.key}
                    href={getHref(item)}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "text-xs font-mono uppercase tracking-widest transition-colors",
                      active
                        ? "text-foreground border-b-2 border-primary pb-1"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {getNavLabel(item.key)}
                  </a>
                );
              })}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <a
                href={locale === "en" ? "/zh" : "/"}
                className="hidden sm:inline-block text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {locale === "en" ? "中/EN" : "EN/中"}
              </a>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden py-4 border-t border-muted bg-background">
              {navItems.map((item) => {
                const active = isNavActive(item);
                return (
                  <a
                    key={item.key}
                    href={getHref(item)}
                    className={cn(
                      "block py-3 px-4 text-xs font-mono uppercase tracking-widest transition-colors",
                      active
                        ? "text-foreground bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    {getNavLabel(item.key)}
                  </a>
                );
              })}
              <a
                href={locale === "en" ? "/zh" : "/"}
                className="block py-3 px-4 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors sm:hidden"
              >
                {locale === "en" ? "中文 / ZH" : "English / EN"}
              </a>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}