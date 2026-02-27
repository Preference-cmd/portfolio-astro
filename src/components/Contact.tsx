import * as React from "react";
import { Mail, Phone, MapPin, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getTranslations, type Locale } from "@/i18n";

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
      value: "sq103832@outlook.com",
      href: "mailto:sq103832@outlook.com",
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
      value: locale === "en" ? "Guangzhou, China" : "中国广东省广州市",
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
    <section id="contact" className="py-20 scroll-mt-16">
      <div className="container px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{contact.title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {contact.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Contact Info */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-6 space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Available For */}
          <Card className="bg-card border-border/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">{contact.availableFor.title}</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-sm text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
