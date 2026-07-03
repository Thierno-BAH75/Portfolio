"use client";

import { useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  SiLinux,
  SiProxmox,
  SiVmware,
  SiCisco,
  SiFortinet,
  SiPfsense,
  SiDocker,
  SiPython,
  SiGnubash,
} from "react-icons/si";
import { Server, Wifi, Activity, Terminal, Cloud, LucideIcon } from "lucide-react";

interface Tech {
  name: string;
  icon: IconType | LucideIcon;
}

// Windows Server, Aruba, Zabbix, PowerShell et Azure sont absents de Simple
// Icons (marques Microsoft retirées / jamais référencées) → icônes lucide.
const technologies: Tech[] = [
  { name: "Linux", icon: SiLinux },
  { name: "Windows Server", icon: Server },
  { name: "Proxmox", icon: SiProxmox },
  { name: "VMware", icon: SiVmware },
  { name: "Cisco", icon: SiCisco },
  { name: "Aruba", icon: Wifi },
  { name: "Fortinet", icon: SiFortinet },
  { name: "pfSense", icon: SiPfsense },
  { name: "Zabbix", icon: Activity },
  { name: "Docker", icon: SiDocker },
  { name: "Python", icon: SiPython },
  { name: "Bash", icon: SiGnubash },
  { name: "PowerShell", icon: Terminal },
  { name: "Azure", icon: Cloud },
];

function TechRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex items-center gap-12 pr-12"
    >
      {technologies.map((tech, i) => {
        const Icon = tech.icon;
        return (
          <div
            key={tech.name}
            className={`flex items-center gap-2.5 text-muted-foreground/70 transition-colors duration-300 ${
              i % 2 === 0 ? "hover:text-violet-400" : "hover:text-cyan-400"
            }`}
          >
            <Icon className="h-7 w-7 shrink-0" />
            <span className="text-sm whitespace-nowrap">{tech.name}</span>
          </div>
        );
      })}
    </div>
  );
}

export function TechMarquee() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border/40 bg-background/40 backdrop-blur-sm py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4">
          {technologies.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <div
                key={tech.name}
                className={`flex items-center gap-2.5 text-muted-foreground/70 transition-colors duration-300 ${
                  i % 2 === 0 ? "hover:text-violet-400" : "hover:text-cyan-400"
                }`}
              >
                <Icon className="h-7 w-7 shrink-0" />
                <span className="text-sm whitespace-nowrap">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-x-0 bottom-0 z-10 border-t border-border/40 bg-background/40 backdrop-blur-sm">
      <style>{`
        @keyframes tech-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tech-marquee-track {
          animation: tech-marquee 35s linear infinite;
        }
        .tech-marquee-viewport:hover .tech-marquee-track {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="tech-marquee-viewport h-[72px] flex items-center overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <div className="tech-marquee-track flex w-max items-center">
          <TechRow />
          <TechRow ariaHidden />
        </div>
      </div>
    </div>
  );
}
