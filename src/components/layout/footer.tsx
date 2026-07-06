"use client";

import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import { personalInfo, socialLinks } from "@/data/experience";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/60 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          {/* Nom — cohérent avec le logo du header */}
          <Link href="/" className="font-bold gradient-text shrink-0">
            Thierno BAH
          </Link>

          {/* Liens rapides : réseaux + admin discret */}
          <div className="flex items-center gap-1 order-3 sm:order-2">
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
            <span aria-hidden="true" className="h-4 w-px bg-border/60 mx-1.5" />
            <Link
              href="/admin"
              className="px-1 text-xs text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            >
              {t.footer.admin}
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground order-2 sm:order-3 shrink-0">
            &copy; {currentYear} {personalInfo.name}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
