"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Wrench,
  ShieldCheck,
  Lock,
  Radar,
  Bug,
  Gauge,
  Database,
  Fish,
  Droplets,
  Network,
  Waypoints,
  Binary,
  Plug,
  Zap,
  KeyRound,
  Hash,
  Key,
  Code2,
  HardDrive,
  Clock,
} from "lucide-react";
import { SectionBackground } from "@/components/ui/section-background";
import { BackToHomeLink } from "@/components/ui/back-to-home-link";
import { ToolCard } from "@/components/tools/tool-card";
import { useI18n } from "@/i18n";

// Chaque outil n'est monté que lorsque sa carte est ouverte (ToolCard rend
// ses children conditionnellement) — dynamic() va plus loin : le CODE de
// chaque outil devient son propre chunk, téléchargé au clic plutôt
// qu'embarqué dans le JS initial de /outils pour les 19 outils à la fois.
const SecurityHeadersAnalyzer = dynamic(() =>
  import("@/components/tools/security-headers-analyzer").then((m) => m.SecurityHeadersAnalyzer)
);
const SslTlsChecker = dynamic(() =>
  import("@/components/tools/ssl-tls-checker").then((m) => m.SslTlsChecker)
);
const PortScanSimulator = dynamic(() =>
  import("@/components/tools/port-scan-simulator").then((m) => m.PortScanSimulator)
);
const BurpSuiteReference = dynamic(() =>
  import("@/components/tools/burp-suite-reference").then((m) => m.BurpSuiteReference)
);
const RiskCalculator = dynamic(() =>
  import("@/components/tools/risk-calculator").then((m) => m.RiskCalculator)
);
const VulnerabilityDatabase = dynamic(() =>
  import("@/components/tools/vulnerability-database").then((m) => m.VulnerabilityDatabase)
);
const PhishingSimulator = dynamic(() =>
  import("@/components/tools/phishing-simulator").then((m) => m.PhishingSimulator)
);
const DataLeakChecker = dynamic(() =>
  import("@/components/tools/data-leak-checker").then((m) => m.DataLeakChecker)
);
const WiresharkReference = dynamic(() =>
  import("@/components/tools/wireshark-reference").then((m) => m.WiresharkReference)
);
const SubnetCalculator = dynamic(() =>
  import("@/components/tools/subnet-calculator").then((m) => m.SubnetCalculator)
);
const AddressConverter = dynamic(() =>
  import("@/components/tools/address-converter").then((m) => m.AddressConverter)
);
const PortLookup = dynamic(() =>
  import("@/components/tools/port-lookup").then((m) => m.PortLookup)
);
const BandwidthCalculator = dynamic(() =>
  import("@/components/tools/bandwidth-calculator").then((m) => m.BandwidthCalculator)
);
const PasswordStrengthAnalyzer = dynamic(() =>
  import("@/components/tools/password-strength-analyzer").then((m) => m.PasswordStrengthAnalyzer)
);
const HashGenerator = dynamic(() =>
  import("@/components/tools/hash-generator").then((m) => m.HashGenerator)
);
const PasswordGenerator = dynamic(() =>
  import("@/components/tools/password-generator").then((m) => m.PasswordGenerator)
);
const Base64Codec = dynamic(() =>
  import("@/components/tools/base64-codec").then((m) => m.Base64Codec)
);
const RaidCalculator = dynamic(() =>
  import("@/components/tools/raid-calculator").then((m) => m.RaidCalculator)
);
const CronCalculator = dynamic(() =>
  import("@/components/tools/cron-calculator").then((m) => m.CronCalculator)
);

export default function OutilsPage() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <SectionBackground glowPosition="top-right" variant="violet" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <BackToHomeLink />

        {/* Header — même pattern que Certifications/Skills/Parcours */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-violet-500/30">
              <Wrench className="w-5 h-5 text-cyan-400" />
            </span>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4">
            {t.tools.eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.tools.titleStart} <span className="gradient-text">{t.tools.titleGradient}</span>
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{t.tools.subtitle}</p>
        </motion.div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-start">
          <ToolCard
            icon={ShieldCheck}
            category="live"
            title={t.tools.cards.securityHeaders.title}
            description={t.tools.cards.securityHeaders.description}
            badge={t.tools.badges.live}
          >
            <SecurityHeadersAnalyzer />
          </ToolCard>

          <ToolCard
            icon={Lock}
            category="simulation"
            title={t.tools.cards.sslChecker.title}
            description={t.tools.cards.sslChecker.description}
            badge={t.tools.badges.simulation}
          >
            <SslTlsChecker />
          </ToolCard>

          <ToolCard
            icon={Radar}
            category="simulation"
            title={t.tools.cards.portScan.title}
            description={t.tools.cards.portScan.description}
            badge={t.tools.badges.simulation}
          >
            <PortScanSimulator />
          </ToolCard>

          <ToolCard
            icon={Bug}
            category="reference"
            title={t.tools.cards.burpReference.title}
            description={t.tools.cards.burpReference.description}
            badge={t.tools.badges.reference}
          >
            <BurpSuiteReference />
          </ToolCard>

          <ToolCard
            icon={Gauge}
            category="interactive"
            title={t.tools.cards.riskCalculator.title}
            description={t.tools.cards.riskCalculator.description}
            badge={t.tools.badges.interactive}
          >
            <RiskCalculator />
          </ToolCard>

          <ToolCard
            icon={Database}
            category="reference"
            title={t.tools.cards.vulnDatabase.title}
            description={t.tools.cards.vulnDatabase.description}
            badge={t.tools.badges.reference}
          >
            <VulnerabilityDatabase />
          </ToolCard>

          <ToolCard
            icon={Fish}
            category="educational"
            title={t.tools.cards.phishing.title}
            description={t.tools.cards.phishing.description}
            badge={t.tools.badges.educational}
          >
            <PhishingSimulator />
          </ToolCard>

          <ToolCard
            icon={Droplets}
            category="simulation"
            title={t.tools.cards.dataLeak.title}
            description={t.tools.cards.dataLeak.description}
            badge={t.tools.badges.simulation}
          >
            <DataLeakChecker />
          </ToolCard>

          <ToolCard
            icon={Network}
            category="reference"
            title={t.tools.cards.wiresharkReference.title}
            description={t.tools.cards.wiresharkReference.description}
            badge={t.tools.badges.reference}
          >
            <WiresharkReference />
          </ToolCard>

          <ToolCard
            icon={Waypoints}
            category="interactive"
            title={t.tools.cards.subnetCalculator.title}
            description={t.tools.cards.subnetCalculator.description}
            badge={t.tools.badges.interactive}
          >
            <SubnetCalculator />
          </ToolCard>

          <ToolCard
            icon={Binary}
            category="interactive"
            title={t.tools.cards.addressConverter.title}
            description={t.tools.cards.addressConverter.description}
            badge={t.tools.badges.interactive}
          >
            <AddressConverter />
          </ToolCard>

          <ToolCard
            icon={Plug}
            category="reference"
            title={t.tools.cards.portLookup.title}
            description={t.tools.cards.portLookup.description}
            badge={t.tools.badges.reference}
          >
            <PortLookup />
          </ToolCard>

          <ToolCard
            icon={Zap}
            category="interactive"
            title={t.tools.cards.bandwidthCalculator.title}
            description={t.tools.cards.bandwidthCalculator.description}
            badge={t.tools.badges.interactive}
          >
            <BandwidthCalculator />
          </ToolCard>

          <ToolCard
            icon={KeyRound}
            category="interactive"
            title={t.tools.cards.passwordStrength.title}
            description={t.tools.cards.passwordStrength.description}
            badge={t.tools.badges.interactive}
          >
            <PasswordStrengthAnalyzer />
          </ToolCard>

          <ToolCard
            icon={Hash}
            category="interactive"
            title={t.tools.cards.hashGenerator.title}
            description={t.tools.cards.hashGenerator.description}
            badge={t.tools.badges.interactive}
          >
            <HashGenerator />
          </ToolCard>

          <ToolCard
            icon={Key}
            category="interactive"
            title={t.tools.cards.passwordGenerator.title}
            description={t.tools.cards.passwordGenerator.description}
            badge={t.tools.badges.interactive}
          >
            <PasswordGenerator />
          </ToolCard>

          <ToolCard
            icon={Code2}
            category="interactive"
            title={t.tools.cards.base64Codec.title}
            description={t.tools.cards.base64Codec.description}
            badge={t.tools.badges.interactive}
          >
            <Base64Codec />
          </ToolCard>

          <ToolCard
            icon={HardDrive}
            category="interactive"
            title={t.tools.cards.raidCalculator.title}
            description={t.tools.cards.raidCalculator.description}
            badge={t.tools.badges.interactive}
          >
            <RaidCalculator />
          </ToolCard>

          <ToolCard
            icon={Clock}
            category="interactive"
            title={t.tools.cards.cronCalculator.title}
            description={t.tools.cards.cronCalculator.description}
            badge={t.tools.badges.interactive}
          >
            <CronCalculator />
          </ToolCard>
        </div>
      </div>
    </div>
  );
}
