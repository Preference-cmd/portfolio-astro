import * as React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { getTranslations, type Locale } from "@/i18n";

interface PortfolioContentProps {
  locale: Locale;
}

export function PortfolioContent({ locale }: PortfolioContentProps) {
  const t = getTranslations(locale);

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} />
        <About locale={locale} />
        <Experience locale={locale} />
        <Projects locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
