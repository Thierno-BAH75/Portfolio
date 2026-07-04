import { Skill } from "@/types";

export const skills: Skill[] = [
  // Sécurité Réseau
  {
    name: "Fortigate",
    icon: "shield",
    category: "security",
  },
  {
    name: "Stormshield",
    icon: "shield",
    category: "security",
  },
  {
    name: "pfSense",
    icon: "shield",
    category: "security",
  },
  {
    name: "Security Onion",
    icon: "shield",
    category: "security",
  },
  {
    name: "SIEM",
    icon: "shield",
    category: "security",
  },
  {
    name: "IDS/IPS",
    icon: "shield",
    category: "security",
  },

  // Réseaux
  {
    name: "VLANs",
    icon: "network",
    category: "network",
  },
  {
    name: "Routage Inter-VLAN",
    icon: "network",
    category: "network",
  },
  {
    name: "Cisco (CCNA)",
    icon: "network",
    category: "network",
  },
  {
    name: "Aruba Wi-Fi",
    icon: "network",
    category: "network",
  },
  {
    name: "VPN",
    icon: "network",
    category: "network",
  },
  {
    name: "TCP/IP",
    icon: "network",
    category: "network",
  },

  // Systèmes
  {
    name: "Active Directory",
    icon: "server",
    category: "systems",
  },
  {
    name: "Exchange Server",
    icon: "server",
    category: "systems",
  },
  {
    name: "VMware",
    icon: "server",
    category: "systems",
  },
  {
    name: "Hyper-V",
    icon: "server",
    category: "systems",
  },
  {
    name: "Proxmox",
    icon: "server",
    category: "systems",
  },
  {
    name: "Windows Server",
    icon: "server",
    category: "systems",
  },
  {
    name: "Linux",
    icon: "server",
    category: "systems",
  },

  // Cloud & DevSecOps
  {
    name: "Docker",
    icon: "cloud",
    category: "cloud",
  },
  {
    name: "Kubernetes",
    icon: "cloud",
    category: "cloud",
  },
  {
    name: "Azure",
    icon: "cloud",
    category: "cloud",
  },
  {
    name: "AWS",
    icon: "cloud",
    category: "cloud",
  },
  {
    name: "DevSecOps",
    icon: "cloud",
    category: "cloud",
  },

  // Outils de supervision
  {
    name: "Zabbix",
    icon: "tool",
    category: "tools",
  },
  {
    name: "SCCM",
    icon: "tool",
    category: "tools",
  },
  {
    name: "GLPI",
    icon: "tool",
    category: "tools",
  },
  {
    name: "Wireshark",
    icon: "tool",
    category: "tools",
  },
  {
    name: "Git",
    icon: "tool",
    category: "tools",
  },

  // Scripting
  {
    name: "PowerShell",
    icon: "code",
    category: "scripting",
  },
  {
    name: "Bash",
    icon: "code",
    category: "scripting",
  },
  {
    name: "Python",
    icon: "code",
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
