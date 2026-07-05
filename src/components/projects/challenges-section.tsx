"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ProjectChallenge } from "@/types";
import type { Locale } from "@/types";

interface ChallengesSectionProps {
  challenges: ProjectChallenge[];
  locale: Locale;
  title: string;
  labelProblem: string;
  labelSolution: string;
}

export function ChallengesSection({
  challenges,
  locale,
  title,
  labelProblem,
  labelSolution,
}: ChallengesSectionProps) {
  const reduce = useReducedMotion();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {challenges.map((challenge, idx) => (
          <motion.div
            key={idx}
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-border/60 overflow-hidden"
          >
            <div className="px-5 py-3 border-b border-border/60 bg-muted/20">
              <span className="font-semibold text-foreground text-sm">
                {challenge.title[locale]}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-violet-400 mb-1.5">
                  {labelProblem}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {challenge.problem[locale]}
                </p>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-cyan-400 mb-1.5">
                  {labelSolution}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {challenge.solution[locale]}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
