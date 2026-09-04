"use client";

import { useEffect, useMemo, useState } from "react";
import type { SupportCategory, SupportEntry } from "@/types/models";

function clean(value: string) {
  return value
    .trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");
}

function parseLibrary(source: string): SupportEntry[] {
  const entries: Record<string, string>[] = [];
  let current: Record<string, string> | null = null;
  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line.startsWith("- id:")) {
      if (current) entries.push(current);
      current = { id: clean(line.slice(5)) };
      continue;
    }
    const match = line.match(/^([a-z]+):\s*(.*)$/i);
    if (current && match) current[match[1]] = clean(match[2]);
  }
  if (current) entries.push(current);
  return entries as unknown as SupportEntry[];
}

export function useSupportLibrary() {
  const [entries, setEntries] = useState<SupportEntry[]>([]);
  useEffect(() => {
    fetch("/content/support-library.yaml")
      .then((response) => response.text())
      .then((text) => setEntries(parseLibrary(text)))
      .catch(() => setEntries([]));
  }, []);

  return useMemo(
    () => ({
      entries,
      forCategory(category: SupportCategory) {
        return entries.find((entry) => entry.category === category);
      },
      answer(query: string) {
        const stopWords = new Set([
          "the",
          "and",
          "how",
          "what",
          "where",
          "does",
          "this",
          "that",
          "with",
          "from",
          "have",
        ]);
        const aliases: Record<string, string[]> = {
          data: ["data", "information", "privacy", "stored"],
          stored: ["stored", "storage", "local", "browser"],
          ai: ["ai", "generative", "coach"],
          start: ["start", "begin", "procrastination"],
          smoke: ["smoke", "smoking", "cigarette"],
        };
        const terms = query
          .toLowerCase()
          .split(/\W+/)
          .filter((term) => term.length > 2 && !stopWords.has(term));
        return entries
          .map((entry) => {
            const haystack = [entry.question, entry.category, entry.answer, entry.action]
              .join(" ")
              .toLowerCase();
            const score = terms.reduce((total, term) => {
              const related = aliases[term] ?? [term];
              return (
                total +
                related.reduce((matches, word) => matches + (haystack.includes(word) ? 1 : 0), 0)
              );
            }, 0);
            return { entry, score };
          })
          .sort((a, b) => b.score - a.score)[0]?.entry;
      },
    }),
    [entries],
  );
}
