// === MATURITY STAGES ===

export enum MaturityStage {
  DOT = "dot",
  LINE = "line",
  PARAGRAPH = "paragraph",
  PAGE = "page",
}

// === CORE ENTITIES ===

export interface Idea {
  id: string;
  title: string;
  spark: string;
  maturity: MaturityStage;
  messages: Message[];
  spec: IdeaSpec | null;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  turnNumber: number;
}

export interface IdeaSpec {
  problem: string;
  audience: string;
  solution: string;
  successMetrics: string;
  effortEstimate: string;
  uniqueness: string;
}

// === MATURITY TRANSITION RULES ===

export interface MaturityRule {
  from: MaturityStage;
  to: MaturityStage;
  requiredFields: (keyof IdeaSpec)[];
  minTurns: number;
}

export const MATURITY_RULES: MaturityRule[] = [
  { from: MaturityStage.DOT, to: MaturityStage.LINE, requiredFields: [], minTurns: 1 },
  { from: MaturityStage.LINE, to: MaturityStage.PARAGRAPH, requiredFields: ["problem", "audience"], minTurns: 3 },
  { from: MaturityStage.PARAGRAPH, to: MaturityStage.PAGE, requiredFields: ["problem", "audience", "solution", "successMetrics", "effortEstimate", "uniqueness"], minTurns: 5 },
];

// === STORAGE SCHEMA ===
// AsyncStorage keys: @nokta/ideas → string[] (ID list), @nokta/idea/<uuid> → Idea JSON
// All reads/writes go through src/features/idea/services/storage.ts
// Direct AsyncStorage access from components is FORBIDDEN.
