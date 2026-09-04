export type Screen =
  "home" | "calendar" | "task" | "focus" | "pause" | "insights" | "goals" | "coach" | "profile";

export type Task = {
  id: number;
  title: string;
  time: string;
  end: string;
  category: string;
  color: string;
  done: boolean;
  description: string;
};

export type SupportCategory =
  "Want to Smoke" | "Procrastination" | "Urge / Habit" | "Distracted" | "Feeling Low" | "Other";

export type Reset = {
  kind: SupportCategory;
  result: string;
};

export type SupportEntry = {
  id: string;
  category: SupportCategory | "App Help";
  question: string;
  answer: string;
  action: string;
  caution?: string;
};
