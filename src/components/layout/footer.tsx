"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { navItems } from "@/data/experience";
import type { PersonalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";
import type { SocialLink } from "@/types";

// 3 premiers liens d'ancre → colonne "Navigation", 3 derniers → colonne "Explorer"
const NAV_SPLIT = 3;

function FooterLinkList({ links, tx }: { links: typeof navItems; tx: (l: (typeof navItems)[number]["label"]) => string }) {
  return (
    <ul className="flex flex-col items-center sm:items-start gap-2">
      {links.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {tx(item.label)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer({
  personalInfo,
  socialLinks,
}: {
  personalInfo: PersonalInfo;
  socialLinks: SocialLink[];
}) {
  const currentYear = new Date().getFullYear();
  const { t, tx } = useI18n();

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Zone haute : identité + 2 colonnes de navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 text-center sm:text-left">
          {/* Identité */}
          <div className="flex flex-col items-center sm:items-start gap-3 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="font-bold text-lg gradient-text">
              {personalInfo.name}
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              {tx(personalInfo.title)}
            </p>
            <p className="text-xs text-muted-foreground/60">{t.footer.keywords}</p>
            <div className="flex items-center gap-1 -ml-2 sm:-ml-2">
              {socialLinks
                .filter((social) => social.icon === "github" || social.icon === "linkedin")
                .map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className={cn(
                      "p-2 text-muted-foreground transition-colors",
                      social.icon === "github"
                        ? "hover:text-violet-400"
                        : "hover:text-cyan-400"
                    )}
                  >
                    {social.icon === "github" ? (
                      <Github size={18} />
                    ) : (
                      <Linkedin size={18} />
                    )}
                  </a>
                ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t.footer.navigation}
            </h3>
            <FooterLinkList links={navItems.slice(0, NAV_SPLIT)} tx={tx} />
          </div>

          {/* Explorer */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">
              {t.footer.explore}
            </h3>
            <FooterLinkList links={navItems.slice(NAV_SPLIT)} tx={tx} />
          </div>
        </div>

        {/* Séparateur */}
        <div className="my-8 lg:my-10 border-t border-border/60" />

        {/* Zone basse : copyright + lien discret */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} {personalInfo.name}. {t.footer.rights}
          </p>
          <Link
            href="/admin"
            className="text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            {t.footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
