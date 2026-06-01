import * as React from "react";
import { Mail, Phone, MapPin, Github, ArrowRight } from "lucide-react";
import { getTranslations, type Locale } from "@/i18n";
import { getResume } from "@/data";
import { SwissTag } from "@/components/ui/swiss-tag";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface ContactProps {
  locale: Locale;
}

export function Contact({ locale }: ContactProps) {
  const t = getTranslations(locale);
  const resume = getResume(locale);
  const info = resume.contact;

  const contact = t.contact as {
    title: string;
    description: string;
    getInTouch: string;
    availableFor: { title: string; services: string[] };
    contactInfo: {
      email: { label: string };
      phone: { label: string };
      location: { label: string };
      github: { label: string };
    };
  };

  const contactInfo = [
    {
      icon: Mail,
      label: contact.contactInfo.email.label,
      value: info.email,
      href: info.email ? `mailto:${info.email}` : null,
    },
    {
      icon: Phone,
      label: contact.contactInfo.phone.label,
      value: info.phone,
      href: info.phone ? `tel:${info.phone.replace(/\s/g, "")}` : null,
    },
    {
      icon: MapPin,
      label: contact.contactInfo.location.label,
      value: info.location || (locale === "en" ? "REDACTED" : "REDACTED"),
      href: null,
    },
    {
      icon: Github,
      label: contact.contactInfo.github.label,
      value: info.github,
      href: info.github ? `https://${info.github.replace(/^https?:\/\//, "")}` : null,
    },
  ];

  const services = contact.availableFor.services;

  return (
    <section id="contact" className="py-16 md:py-24 bg-background relative" aria-label="Contact Section">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <SectionHeader
          number={`05 / ${locale === "en" ? "Contact" : "联系我"}`}
          title={contact.title}
          subtitle={contact.description}
        />

        {/* Editorial grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Contact channels */}
          <div className="lg:col-span-8">
            <div className="border border-muted">
              <div className="p-6 md:p-8 border-b border-muted">
                <h3 className="text-xl font-medium tracking-tight flex items-center gap-3">
                  <span className="w-2 h-2 bg-primary inline-block" />
                  {locale === "en" ? "Communication Channels" : "通讯渠道"}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {contactInfo.map((item, index) => (
                  <div
                    key={item.label}
                    className={cn(
                      "p-6 md:p-8 flex flex-col gap-3 group transition-colors",
                      index % 2 === 0 ? "border-b md:border-r" : "border-b",
                      index > 1 && "border-b-0",
                      item.href && "hover:bg-primary/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                        {item.label}
                      </p>
                    </div>

                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-lg font-medium hover:text-primary transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-lg font-medium">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Available for */}
          <div className="lg:col-span-4">
            <div className="border border-muted h-full flex flex-col">
              <div className="p-6 md:p-8 border-b border-muted bg-primary">
                <h3 className="text-xl font-medium tracking-tight text-primary-foreground">
                  {contact.availableFor.title}
                </h3>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <ul className="space-y-3">
                  {services.map((service) => (
                    <li key={service} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span className="text-primary mt-1">—</span>
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 md:p-8 border-t border-muted">
                <a
                  href="mailto:noreply@example.com"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground hover:text-primary transition-colors group"
                >
                  {contact.getInTouch}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}