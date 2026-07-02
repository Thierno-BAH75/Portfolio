import { Skill } from "@/types";

export const skills: Skill[] = [
  // Sécurité Réseau
  {
    name: "Fortigate",
    icon: "shield",
    level: 90,
    category: "security",
  },
  {
    name: "Stormshield",
    icon: "shield",
    level: 85,
    category: "security",
  },
  {
    name: "pfSense",
    icon: "shield",
    level: 85,
    category: "security",
  },
  {
    name: "Security Onion",
    icon: "shield",
    level: 80,
    category: "security",
  },
  {
    name: "SIEM",
    icon: "shield",
    level: 75,
    category: "security",
  },
  {
    name: "IDS/IPS",
    icon: "shield",
    level: 80,
    category: "security",
  },

  // Réseaux
  {
    name: "VLANs",
    icon: "network",
    level: 95,
    category: "network",
  },
  {
    name: "Routage Inter-VLAN",
    icon: "network",
    level: 90,
    category: "network",
  },
  {
    name: "Cisco (CCNA)",
    icon: "network",
    level: 85,
    category: "network",
  },
  {
    name: "Aruba Wi-Fi",
    icon: "network",
    level: 85,
    category: "network",
  },
  {
    name: "VPN",
    icon: "network",
    level: 85,
    category: "network",
  },
  {
    name: "TCP/IP",
    icon: "network",
    level: 90,
    category: "network",
  },

  // Systèmes
  {
    name: "Active Directory",
    icon: "server",
    level: 90,
    category: "systems",
  },
  {
    name: "Exchange Server",
    icon: "server",
    level: 85,
    category: "systems",
  },
  {
    name: "VMware",
    icon: "server",
    level: 85,
    category: "systems",
  },
  {
    name: "Hyper-V",
    icon: "server",
    level: 80,
    category: "systems",
  },
  {
    name: "Proxmox",
    icon: "server",
    level: 75,
    category: "systems",
  },
  {
    name: "Windows Server",
    icon: "server",
    level: 90,
    category: "systems",
  },
  {
    name: "Linux",
    icon: "server",
    level: 80,
    category: "systems",
  },

  // Cloud & DevSecOps
  {
    name: "Docker",
    icon: "cloud",
    level: 80,
    category: "cloud",
  },
  {
    name: "Kubernetes",
    icon: "cloud",
    level: 70,
    category: "cloud",
  },
  {
    name: "Azure",
    icon: "cloud",
    level: 75,
    category: "cloud",
  },
  {
    name: "AWS",
    icon: "cloud",
    level: 70,
    category: "cloud",
  },
  {
    name: "DevSecOps",
    icon: "cloud",
    level: 75,
    category: "cloud",
  },

  // Outils de supervision
  {
    name: "Zabbix",
    icon: "tool",
    level: 90,
    category: "tools",
  },
  {
    name: "SCCM",
    icon: "tool",
    level: 85,
    category: "tools",
  },
  {
    name: "GLPI",
    icon: "tool",
    level: 85,
    category: "tools",
  },
  {
    name: "Wireshark",
    icon: "tool",
    level: 80,
    category: "tools",
  },
  {
    name: "Git",
    icon: "tool",
    level: 75,
    category: "tools",
  },

  // Scripting
  {
    name: "PowerShell",
    icon: "code",
    level: 85,
    category: "scripting",
  },
  {
    name: "Bash",
    icon: "code",
    level: 80,
    category: "scripting",
  },
  {
    name: "Python",
    icon: "code",
    level: 70,
    category: "scripting",
  },
];

export const skillsByCategory = {
  security: skills.filter((s) => s.category === "security"),
  network: skills.filter((s) => s.category === "network"),
  systems: skills.filter((s) => s.category === "systems"),
  cloud: skills.filter((s) => s.category === "cloud"),
  tools: skills.filter((s) => s.category === "tools"),
  scripting: skills.filter((s) => s.category === "scripting"),
};

export const skillCategories = [
  { id: "security", name: "Sécurité", icon: "shield" },
  { id: "network", name: "Réseaux", icon: "network" },
  { id: "systems", name: "Systèmes", icon: "server" },
  { id: "cloud", name: "Cloud & DevSecOps", icon: "cloud" },
  { id: "tools", name: "Supervision", icon: "tool" },
  { id: "scripting", name: "Scripting", icon: "code" },
];
