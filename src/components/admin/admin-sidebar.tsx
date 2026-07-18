"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Wrench,
  GraduationCap,
  Award,
  UserCog,
  Mail,
  Rss,
  MessageSquare,
  Bot,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LogoutButton } from "@/app/admin/logout-button";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projets", icon: FolderKanban },
  { href: "/admin/experiences", label: "Expériences", icon: Briefcase },
  { href: "/admin/skills", label: "Compétences", icon: Wrench },
  { href: "/admin/education", label: "Formations", icon: GraduationCap },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/veille", label: "Veille", icon: Rss },
  { href: "/admin/chat-logs", label: "Chat IA", icon: MessageSquare },
  { href: "/admin/chatbot", label: "Chatbot", icon: Bot },
  { href: "/admin/security", label: "Sécurité", icon: ShieldCheck },
  { href: "/admin/settings", label: "Infos perso", icon: UserCog },
];

function NavLinks({
  pathname,
  unreadCount,
  onNavigate,
}: {
  pathname: string;
  unreadCount: number;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              active
                ? "bg-gradient-to-r from-violet-600/15 to-cyan-500/15 text-foreground border border-violet-500/30"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
            )}
          >
            <Icon size={17} className={active ? "text-cyan-400" : ""} />
            {item.label}
            {item.href === "/admin/messages" && unreadCount > 0 && (
              <span className="ml-auto inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-[10px] font-semibold">
                {unreadCount}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminSidebar({ userEmail, unreadCount = 0 }: { userEmail: string; unreadCount?: number }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Barre mobile avec bouton hamburger. Seuil md (768px), pas lg
          (1024px) : une vraie fenêtre desktop non maximisée tombe très
          souvent sous 1024px, ce qui faisait disparaître la sidebar en
          entier (bug rapporté après connexion) alors que 768px laisse
          largement la place pour les 256px de la sidebar + le contenu. */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-border bg-card">
        <span className="font-semibold text-sm gradient-text">Admin</span>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 text-muted-foreground hover:text-foreground relative"
          aria-label="Ouvrir le menu"
        >
          <Menu size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
          )}
        </button>
      </div>

      {/* Sidebar desktop */}
      <aside className="hidden md:flex flex-col w-64 flex-shrink-0 border-r border-border bg-card h-screen sticky top-0">
        <div className="h-16 flex items-center px-5 border-b border-border">
          <Link href="/admin" className="font-bold text-lg gradient-text">
            Panneau Admin
          </Link>
        </div>
        <div className="flex-1 py-4 flex flex-col">
          <NavLinks pathname={pathname} unreadCount={unreadCount} />
        </div>
        <div className="p-3 border-t border-border space-y-2">
          <p className="px-3 text-xs text-muted-foreground truncate">{userEmail}</p>
          <LogoutButton />
        </div>
      </aside>

      {/* Sidebar mobile (overlay) */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-[200]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-card border-r border-border flex flex-col">
            <div className="h-14 flex items-center justify-between px-4 border-b border-border">
              <span className="font-bold gradient-text">Panneau Admin</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground"
                aria-label="Fermer le menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 py-4 flex flex-col overflow-y-auto">
              <NavLinks pathname={pathname} unreadCount={unreadCount} onNavigate={() => setMobileOpen(false)} />
            </div>
            <div className="p-3 border-t border-border space-y-2">
              <p className="px-3 text-xs text-muted-foreground truncate">{userEmail}</p>
              <LogoutButton />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
