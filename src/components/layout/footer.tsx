"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { personalInfo, socialLinks, navItems } from "@/data/experience";
import { FadeIn } from "@/components/animations";

const iconMap: Record<string, React.ReactNode> = {
  github: <Github size={20} />,
  linkedin: <Linkedin size={20} />,
  twitter: <Twitter size={20} />,
  mail: <Mail size={20} />,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <FadeIn direction="up" className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold gradient-text">
                {personalInfo.name.split(" ")[0]}
                <span className="text-foreground">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              {personalInfo.tagline}
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  {iconMap[social.icon]}
                </motion.a>
              ))}
            </div>
          </FadeIn>

          {/* Navigation */}
          <FadeIn direction="up" delay={0.1} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Contact */}
          <FadeIn direction="up" delay={0.2} className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>{personalInfo.email}</p>
              <p>{personalInfo.location}</p>
              {personalInfo.available && (
                <p className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Disponible pour des projets</span>
                </p>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} {personalInfo.name}. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground flex items-center">
              Fait avec <Heart size={14} className="mx-1 text-red-500" /> et
              beaucoup de café
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
