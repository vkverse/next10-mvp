"use client";

import { useState } from "react";
import { supportCategories } from "@/content/seed-data";
import { useSupportLibrary } from "@/hooks/use-support-library";
import type { Reset, SupportCategory } from "@/types/models";
import { SupportIcon } from "./support-icons";

type Props = {
  onClose: () => void;
  onComplete: (reset: Reset) => void;
};

const recentPatterns = [
  ["♨", "After tea", "Today, 4:15 PM"],
  ["✦", "Night time", "Yesterday, 10:30 PM"],
  ["◉", "After lunch", "Monday, 12:10 PM"],
];

export function StruggleModal({ onClose, onComplete }: Props) {
  const [step, setStep] = useState<"choose" | "action" | "result">("choose");
  const [category, setCategory] = useState<SupportCategory>("Procrastination");
  const library = useSupportLibrary();
  const entry = library.forCategory(category);

  function choose(next: SupportCategory) {
    setCategory(next);
    setStep("action");
  }

  return (
    <div
      className="overlay"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="stuck-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-title"
      >
        <button className="close" onClick={onClose} aria-label="Close support panel">
          ×
        </button>

        {step === "choose" && (
          <>
            <span className="modal-kicker">IN THE MOMENT</span>
            <h2 id="support-title">I’m Struggling</h2>
            <p>What’s happening right now?</p>
            <div className="choice-grid">
              {supportCategories.map((item) => (
                <button key={item} onClick={() => choose(item)}>
                  <i data-kind={item}>
                    <SupportIcon category={item} />
                  </i>
                  <span>{item}</span>
                </button>
              ))}
            </div>
            <section className="recent-patterns">
              <header>
                <h3>Recent Triggers</h3>
                <button onClick={() => choose("Other")}>View all</button>
              </header>
              {recentPatterns.map(([icon, label, time]) => (
                <button
                  key={label}
                  onClick={() => choose(label === "Night time" ? "Urge / Habit" : "Want to Smoke")}
                >
                  <i>{icon}</i>
                  <span>
                    <b>{label}</b>
                    <small>A pattern you recorded</small>
                  </span>
                  <time>{time}</time>
                </button>
              ))}
            </section>
            <div className="private">⌾ Private by default. Saved only on this device.</div>
          </>
        )}

        {step === "action" && (
          <>
            <span className="modal-kicker">{category.toUpperCase()}</span>
            <h2 id="support-title">Try this next</h2>
            <div className="recommend">
              <i className="recommend-icon">
                <SupportIcon category={category} />
              </i>
              <small>Reviewed suggestion</small>
              <h3>{entry?.action ?? "Pause and choose one small next action"}</h3>
              <p>{entry?.answer ?? "Give yourself a moment before deciding what to do next."}</p>
            </div>
            {entry?.caution && <p className="support-caution">{entry.caution}</p>}
            <button className="primary" onClick={() => setStep("result")}>
              I’ve tried this
            </button>
            <button className="text" onClick={() => setStep("choose")}>
              Choose something else
            </button>
          </>
        )}

        {step === "result" && (
          <>
            <span className="modal-kicker">QUICK REFLECTION</span>
            <h2 id="support-title">Did this help you return?</h2>
            <p>No judgment—this helps find what works for you.</p>
            <div className="results">
              {["Yes, I’m back", "Partly", "Not yet"].map((result) => (
                <button key={result} onClick={() => onComplete({ kind: category, result })}>
                  {result}
                  <span>→</span>
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
