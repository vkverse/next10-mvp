"use client";

import { useMemo, useState } from "react";

type Step = "home" | "trigger" | "reset" | "reflect";

const habits = [
  "Social media",
  "Smoking",
  "Porn",
  "Gaming",
  "Junk food",
  "Spending",
];

const feelings = ["Bored", "Stressed", "Lonely", "Anxious", "Angry", "Automatic"];
const triggers = ["Phone", "Being alone", "Late night", "Work pressure", "Social media", "Unknown"];

const actions = [
  "Take a 10-minute walk without your phone",
  "Wash your face and drink water slowly",
  "Do 20 squats, then sit somewhere different",
  "Play one calming song and breathe with it",
  "Clean one small area for 10 minutes",
  "Message someone you trust: 'Distract me for 10 mins'",
];

export default function Home() {
  const [step, setStep] = useState<Step>("home");
  const [userName, setUserName] = useState("Guest");
  const [habit, setHabit] = useState(habits[0]);
  const [identity, setIdentity] = useState("A focused person");
  const [feeling, setFeeling] = useState(feelings[0]);
  const [trigger, setTrigger] = useState(triggers[0]);
  const [urge, setUrge] = useState(7);
  const [afterUrge, setAfterUrge] = useState(4);
  const [sessions, setSessions] = useState(3);
  const [reflections, setReflections] = useState(2);

  const suggestedAction = useMemo(() => {
    const seed = feeling.length + trigger.length + urge;
    return actions[seed % actions.length];
  }, [feeling, trigger, urge]);

  function completeReset() {
    setSessions((count) => count + 1);
    setStep("reflect");
  }

  function saveReflection() {
    setReflections((count) => count + 1);
    setStep("home");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#07130d] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-18rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-emerald-700/22 blur-3xl" />
        <div className="absolute right-[-16rem] top-24 h-[30rem] w-[30rem] rounded-full bg-lime-300/14 blur-3xl" />
        <div className="absolute bottom-[-18rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-teal-500/16 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between rounded-[2rem] border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl shadow-black/20 backdrop-blur-2xl">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-400 text-lg font-black text-[#092015]">
              N10
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">Next10</p>
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Private reset coach</p>
            </div>
          </div>
          <button className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white/80">
            App locked
          </button>
        </header>

        <section className="grid flex-1 items-start gap-8 py-8 lg:grid-cols-[0.82fr_1.18fr] lg:py-10">
          <div className="space-y-5 lg:sticky lg:top-6">
            <div className="inline-flex rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
              Next 10 minutes
            </div>

            <h1 className="max-w-xl text-4xl font-black leading-[1.02] tracking-normal text-white sm:text-5xl">
              Feeling an urge?
            </h1>

            <p className="max-w-md text-base leading-7 text-white/58">
              Pause. Pick one reset. Check again after 10 minutes.
            </p>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
                Private profile
              </p>
              <input
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-white/10 bg-[#0b1f14] px-4 py-3 text-base font-semibold text-white outline-none"
              />
              <p className="mt-3 text-sm leading-6 text-white/50">
                MVP-la this is local profile. Real app-la login add pannina each
                user-ku separate history, analysis, and progress save pannalam.
              </p>

              <details className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                <summary className="cursor-pointer text-sm font-semibold text-white/70">
                  Private progress
                </summary>
                <div className="mt-3 grid gap-2">
                  {[
                    ["Urges handled", sessions.toString()],
                    ["Reflections", reflections.toString()],
                    ["Avg urge drop", `-${Math.max(0, urge - afterUrge)}`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2"
                    >
                      <span className="text-sm text-white/52">{label}</span>
                      <span className="text-base font-black text-lime-100">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </details>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl">
            {step === "home" && (
              <div className="space-y-4">
                <div className="rounded-[1.5rem] bg-gradient-to-br from-emerald-600 to-lime-500 p-6 text-[#092015]">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/70">
                    Today for {userName || "Guest"}
                  </p>
                  <h2 className="mt-4 text-3xl font-black">You are becoming</h2>
                  <input
                    value={identity}
                    onChange={(event) => setIdentity(event.target.value)}
                    className="mt-3 w-full rounded-2xl border border-white/30 bg-white/25 px-4 py-3 text-lg font-semibold outline-none placeholder:text-[#092015]/45"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Panel title="Habit to control">
                    <div className="grid grid-cols-2 gap-2">
                      {habits.map((item) => (
                        <Choice
                          key={item}
                          active={habit === item}
                          onClick={() => setHabit(item)}
                        >
                          {item}
                        </Choice>
                      ))}
                    </div>
                  </Panel>

                  <Panel title="Quick check">
                    <p className="text-sm leading-6 text-white/55">
                      Current focus: reduce urges around{" "}
                      <span className="text-white">{habit}</span>. Your data
                      stays local in this prototype.
                    </p>
                  </Panel>
                </div>

                <button
                  onClick={() => setStep("trigger")}
                  className="w-full rounded-[1.6rem] bg-lime-200 px-6 py-5 text-lg font-black text-[#092015] shadow-xl shadow-emerald-500/20 transition hover:scale-[1.01]"
                >
                  I&apos;m triggered
                </button>
              </div>
            )}

            {step === "trigger" && (
              <div className="space-y-4">
                <ScreenTitle eyebrow="Trigger mode" title="What is happening right now?" />
                <Panel title="Feeling">
                  <div className="grid grid-cols-2 gap-2">
                    {feelings.map((item) => (
                      <Choice
                        key={item}
                        active={feeling === item}
                        onClick={() => setFeeling(item)}
                      >
                        {item}
                      </Choice>
                    ))}
                  </div>
                </Panel>
                <Panel title={`Urge level: ${urge}/10`}>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={urge}
                    onChange={(event) => setUrge(Number(event.target.value))}
                    className="w-full accent-emerald-400"
                  />
                </Panel>
                <Panel title="Trigger">
                  <div className="grid grid-cols-2 gap-2">
                    {triggers.map((item) => (
                      <Choice
                        key={item}
                        active={trigger === item}
                        onClick={() => setTrigger(item)}
                      >
                        {item}
                      </Choice>
                    ))}
                  </div>
                </Panel>
                <button
                  onClick={() => setStep("reset")}
                  className="w-full rounded-[1.4rem] bg-gradient-to-r from-emerald-500 to-lime-400 px-6 py-4 font-black text-[#092015]"
                >
                  Give me a 10-minute reset
                </button>
              </div>
            )}

            {step === "reset" && (
              <div className="space-y-4">
                <ScreenTitle eyebrow="Reset in progress" title="Win this moment, not forever." />
                <div className="rounded-[1.7rem] border border-white/10 bg-[#0e1020] p-6">
                  <p className="text-sm uppercase tracking-[0.22em] text-emerald-100">
                    Your action
                  </p>
                  <h3 className="mt-4 text-3xl font-black leading-tight">
                    {suggestedAction}
                  </h3>
                  <div className="mt-6 grid h-44 place-items-center rounded-[1.5rem] bg-white/[0.06]">
                    <p className="text-6xl font-black tracking-tight">10:00</p>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-white/55">
                    Your brain is asking for relief. Give it a safer replacement
                    first, then decide from a calmer place.
                  </p>
                </div>
                <button
                  onClick={completeReset}
                  className="w-full rounded-[1.4rem] bg-lime-200 px-6 py-4 font-black text-[#092015]"
                >
                  I finished the reset
                </button>
              </div>
            )}

            {step === "reflect" && (
              <div className="space-y-4">
                <ScreenTitle eyebrow="Reflection" title="Did the urge change?" />
                <Panel title={`After reset: ${afterUrge}/10`}>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={afterUrge}
                    onChange={(event) => setAfterUrge(Number(event.target.value))}
                    className="w-full accent-lime-300"
                  />
                </Panel>
                <div className="rounded-[1.7rem] border border-white/10 bg-white/[0.06] p-5">
                  <p className="text-sm text-white/55">Before</p>
                  <p className="text-4xl font-black">{urge}/10</p>
                  <p className="mt-4 text-sm text-white/55">Now</p>
                  <p className="text-4xl font-black text-lime-200">{afterUrge}/10</p>
                  <p className="mt-5 text-sm leading-6 text-white/55">
                    One difficult moment does not erase progress. This is data,
                    not judgement.
                  </p>
                </div>
                <button
                  onClick={saveReflection}
                  className="w-full rounded-[1.4rem] bg-gradient-to-r from-lime-300 to-emerald-400 px-6 py-4 font-black text-[#092015]"
                >
                  Save reflection
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-4">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/42">
        {title}
      </p>
      {children}
    </div>
  );
}

function Choice({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-3 py-3 text-left text-sm font-semibold transition ${
        active
          ? "bg-lime-200 text-[#092015]"
          : "border border-white/10 bg-white/[0.04] text-white/62 hover:bg-white/[0.08]"
      }`}
    >
      {children}
    </button>
  );
}

function ScreenTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-black leading-tight">{title}</h2>
    </div>
  );
}
