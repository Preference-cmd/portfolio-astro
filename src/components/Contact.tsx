import * as React from "react";
import { Mail, Phone, MapPin, Github, ArrowRight } from "lucide-react";
import { getTranslations, type Locale } from "@/i18n";
import { cn } from "@/lib/utils";

interface ContactProps {
  locale: Locale;
}

export function Contact({ locale }: ContactProps) {
  const t = getTranslations(locale);
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
      value: "noreply@example.com",
      href: "mailto:noreply@example.com",
    },
    {
      icon: Phone,
      label: contact.contactInfo.phone.label,
      value: "+86 13798093084",
      href: "tel:+8613798093084",
    },
    {
      icon: MapPin,
      label: contact.contactInfo.location.label,
      value: locale === "en" ? "REDACTED" : "REDACTED",
      href: null,
    },
    {
      icon: Github,
      label: contact.contactInfo.github.label,
      value: "github.com/Preference-cmd",
      href: "https://github.com/Preference-cmd",
    },
  ];

  const services = contact.availableFor.services;

  return (
    <section id="contact" className="py-24 bg-background relative" aria-label="Contact Section">
      <div className="container px-4 md:px-8 w-full max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-muted pb-8 mb-16 relative z-10">
          <div className="relative">
            <div className="text-muted-foreground font-mono text-xs uppercase tracking-widest mb-4">
              05 / {locale === "en" ? "Contact" : "联系我"}
            </div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase">
              {contact.title}
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-sm mt-6 md:mt-0 md:text-right">
            {contact.description}
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 w-full mb-12">

          {/* Main Contact Form / Info Zone */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="border border-muted bg-card">

              {/* Header Bar */}
              <div className="p-6 md:p-8 border-b border-muted bg-muted/10">
                <h3 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <span className="w-3 h-3 bg-primary inline-block"></span>
                  {locale === "en" ? "Communication Channels" : "通讯渠道"}
                </h3>
              </div>

              {/* Contact Grid inside standard module */}
              <div className="grid grid-cols-1 md:grid-cols-2">
                {contactInfo.map((item, index) => (
                  <div key={item.label} className={cn(
                    "p-6 md:p-8 border-muted flex flex-col gap-4 group transition-colors",
                    index % 2 === 0 ? "border-b md:border-r" : "border-b",
                    index > 1 && "border-b-0",
                    item.href && "hover:bg-primary/5 cursor-crosshair"
                  )}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 border border-muted bg-background group-hover:border-primary group-hover:text-primary transition-colors">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{item.label}</p>
                    </div>

                    <div className="mt-auto">
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-lg md:text-xl font-bold hover:text-primary transition-colors flex items-center gap-2 group-hover:underline decoration-primary underline-offset-4"
                        >
                          {item.value}
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      ) : (
                        <p className="text-lg md:text-xl font-bold">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Column: Available For / Services */}
          <div className="lg:col-span-4 flex flex-col">
            <div className="border border-muted bg-card h-full flex flex-col">
              <div className="p-6 md:p-8 border-b border-muted bg-primary text-primary-foreground">
                <h3 className="text-2xl font-black uppercase tracking-tighter">
                  {contact.availableFor.title}
                </h3>
              </div>
              <div className="p-6 md:p-8 flex-grow">
                <ul className="space-y-4">
                  {services.map((service) => (
                    <li key={service} className="flex items-start gap-4 font-mono text-sm leading-relaxed group">
                      <span className="text-primary mt-1 font-bold group-hover:scale-150 transition-transform">]</span>
                      <span className="group-hover:text-primary transition-colors">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to Action Bar */}
              <div className="p-6 md:p-8 border-t border-muted bg-muted/10">
                <a href="mailto:noreply@example.com" className="w-full inline-flex items-center justify-between border border-primary bg-primary text-primary-foreground hover:bg-background hover:text-primary px-6 py-4 font-bold uppercase tracking-widest transition-all">
                  {contact.getInTouch}
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
