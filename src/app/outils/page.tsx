"use client";

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
} from "lucide-react";
import { SectionBackground } from "@/components/ui/section-background";
import { ToolCard } from "@/components/tools/tool-card";
import { SecurityHeadersAnalyzer } from "@/components/tools/security-headers-analyzer";
import { SslTlsChecker } from "@/components/tools/ssl-tls-checker";
import { PortScanSimulator } from "@/components/tools/port-scan-simulator";
import { BurpSuiteReference } from "@/components/tools/burp-suite-reference";
import { RiskCalculator } from "@/components/tools/risk-calculator";
import { VulnerabilityDatabase } from "@/components/tools/vulnerability-database";
import { PhishingSimulator } from "@/components/tools/phishing-simulator";
import { DataLeakChecker } from "@/components/tools/data-leak-checker";
import { WiresharkReference } from "@/components/tools/wireshark-reference";
import { useI18n } from "@/i18n";

export default function OutilsPage() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
      <SectionBackground glowPosition="top-right" variant="violet" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
        </div>
      </div>
    </div>
  );
}
