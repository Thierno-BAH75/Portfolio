"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, personalInfo, socialLinks } from "@/data/experience";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useI18n, setLocale } from "@/i18n";
import type { Locale } from "@/types";

// Sections de la home suivies par le scroll-spy (ordre du DOM)
const SPY_SECTION_IDS = ["accueil", "about", "experience", "contact"];

function SocialIcons({ size = 18 }: { size?: number }) {
  return (
    <>
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
              <Github size={size} />
            ) : (
              <Linkedin size={size} />
            )}
          </a>
        ))}
    </>
  );
}

function AvailabilityBadge({
  className,
  onClick,
  short = false,
}: {
  className?: string;
  onClick?: () => void;
  short?: boolean;
}) {
  const { t } = useI18n();

  if (!personalInfo.available) return null;

  return (
    <Link
      href="/#contact"
      onClick={onClick}
      className={cn(
        "items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-xs font-medium text-green-500 hover:bg-green-500/20 transition-colors whitespace-nowrap",
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      {short ? t.header.availableShort : t.header.availableFull}
    </Link>
  );
}

// Bouton FR/EN — bascule instantanée, choix persisté en localStorage
function LangToggle({ className }: { className?: string }) {
  const { locale, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.langSwitch}
      className={cn(
        "flex items-center rounded-full border border-border/60 p-0.5 text-[11px] font-semibold",
        className
      )}
    >
      {(["fr", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={cn(
            "px-2 py-0.5 rounded-full uppercase transition-colors",
            locale === l
              ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const visibleSections = useRef<Record<string, boolean>>({});
  const pathname = usePathname();
  const { t, tx } = useI18n();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy : uniquement sur la home. Pas de reset hors home :
  // isItemActive ignore activeSection dès que pathname !== "/".
  useEffect(() => {
    if (pathname !== "/") return;

    const sections = SPY_SECTION_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    visibleSections.current = {};
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleSections.current[entry.target.id] = entry.isIntersecting;
        }
        const current = SPY_SECTION_IDS.find(
          (id) => visibleSections.current[id]
        );
        setActiveSection(current ?? null);
      },
      // Bande horizontale entre 20% et 30% du viewport : la section qui la
      // traverse est considérée active (compense aussi le header fixe)
      { rootMargin: "-20% 0px -70% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isItemActive = (href: string) => {
    if (href.startsWith("/#")) {
      return pathname === "/" && activeSection === href.slice(2);
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="w-full px-2 sm:px-4">
        {/* Logo à gauche / nav centrée / actions à droite.
            [1fr_auto_1fr] : les colonnes latérales s'équilibrent,
            la nav reste au centre exact du header. */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-20">
          {/* Logo — colonne gauche */}
          <Link href="/" className="flex items-center pl-1 justify-self-start">
            <motion.span
              className="text-xl lg:text-2xl font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Thierno BAH
            </motion.span>
          </Link>

          {/* Nav — colonne centrale */}
          <div className="hidden xl:flex items-center gap-1 justify-center">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors group",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tx(item.label)}
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400 transition-transform origin-left",
                      active
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Actions — colonne droite */}
          <div className="hidden xl:flex items-center gap-1 pr-1 justify-self-end">
            <AvailabilityBadge className="flex" short />
            <LangToggle className="ml-1" />
            <ThemeToggle />
            <SocialIcons />
            <Button
              size="sm"
              className="bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg hover:shadow-[0_0_16px_rgba(139,92,246,0.4)]"
              asChild
            >
              <Link href="/#contact">{t.header.contact}</Link>
            </Button>
          </div>

          {/* Tablette/mobile — toggle + burger à droite */}
          <div className="flex xl:hidden items-center gap-1 pr-1 col-start-3 row-start-1 justify-self-end">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="px-4 pb-2 flex items-center gap-3"
              >
                <AvailabilityBadge
                  className="inline-flex"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                <LangToggle />
              </motion.div>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-lg font-medium rounded-lg transition-colors",
                      isItemActive(item.href)
                        ? "text-foreground bg-muted"
                        : "text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {tx(item.label)}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                className="pt-4"
              >
                <Button
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg"
                  asChild
                >
                  <Link
                    href="/#contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.header.contact}
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (navItems.length + 1) * 0.1 }}
                className="flex items-center justify-center gap-4 pt-3"
              >
                <SocialIcons size={20} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
