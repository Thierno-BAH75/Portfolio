import type { ProjectCategory } from "@/types";

export const projectCategoryLabels: Record<ProjectCategory, string> = {
  security: "Sécurité",
  infrastructure: "Infrastructure",
  monitoring: "Supervision",
  network: "Réseaux",
  cloud: "Cloud",
  automation: "Automation",
};

export const LONG_DESCRIPTION_TEMPLATE_FR = `## 📋 Contexte du projet


## 🎯 Objectifs
-
-

## 🛠️ Technologies utilisées


## 💡 Démarche
-
-

## 📊 Résultats
-
-

## 🚀 Compétences développées
`;

export const LONG_DESCRIPTION_TEMPLATE_EN = `## 📋 Project context


## 🎯 Objectives
-
-

## 🛠️ Technologies used


## 💡 Approach
-
-

## 📊 Results
-
-

## 🚀 Skills developed
`;
