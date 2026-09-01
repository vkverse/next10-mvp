"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type Screen = "home" | "reset" | "timer" | "reflect" | "activity" | "profile";

type Activity = {
  id: number;
  title: string;
  subtitle: string;
  value: string;
};

const habits = ["Phone", "Smoking", "Porn", "Gaming", "Junk food", "Spending"];
const feelings = ["Bored", "Stress", "Alone", "Anxious", "Angry", "Habit"];
const triggers = ["Social media", "Late night", "Being alone", "Work", "Location", "Unknown"];
const resetIdeas = [
  "Go for a walk",
  "Drink water slowly",
  "Move rooms",
  "Play calm music",
  "Clean one area",
  "Text a friend",
];
const timerLength = 10 * 60;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setName] = useState("Marcus");
  const [habit, setHabit] = useState(habits[0]);
  const [identity, setIdentity] = useState("Stay calm today");
  const [feeling, setFeeling] = useState(feelings[0]);
  const [trigger, setTrigger] = useState(triggers[0]);
  const [urge, setUrge] = useState(7);
  const [afterUrge, setAfterUrge] = useState(4);
  const [timeLeft, setTimeLeft] = useState(timerLength);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: "Daily reset",
      subtitle: "Late night phone urge",
      value: "8 to 5",
    },
    {
      id: 2,
      title: "Reflection",
      subtitle: "Boredom was the trigger",
      value: "Saved",
    },
  ]);

  const resetIdea = useMemo(() => {
    return resetIdeas[(feeling.length + trigger.length + urge) % resetIdeas.length];
  }, [feeling, trigger, urge]);

  useEffect(() => {
    if (!timerRunning || timeLeft <= 0) return;

    const timerId = window.setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          setTimerRunning(false);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [timerRunning, timeLeft]);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const timerProgress = 1 - timeLeft / timerLength;
  const resetCount = activities.filter((item) => item.title.includes("reset")).length + 3;

  function go(nextScreen: Screen) {
    setMenuOpen(false);
    setScreen(nextScreen);
  }

  function startTimer() {
    setTimeLeft(timerLength);
    setTimerRunning(true);
    go("timer");
  }

  function finishTimer() {
    setTimerRunning(false);
    go("reflect");
  }

  function saveReflection() {
    setActivities((items) => [
      {
        id: Date.now(),
        title: "Daily reset",
        subtitle: `${habit}, ${feeling.toLowerCase()}, ${trigger.toLowerCase()}`,
        value: `${urge} to ${afterUrge}`,
      },
      ...items,
    ]);
    go("activity");
  }

  return (
    <main className="min-h-screen bg-[#fffdf3] text-[#1f2b1d]">
      <div className="mx-auto flex min-h-screen w-full max-w-[390px] flex-col overflow-hidden bg-[#fffdf3]">
        <header className="relative z-20 px-5 pb-2 pt-4">
          <div className="flex items-center justify-between">
            <button onClick={() => go("home")} className="text-left">
              <p className="text-[11px] font-bold text-[#7e8978]">Hello,</p>
              <p className="text-xl font-black leading-none">{name}</p>
            </button>

            <div className="relative">
              <button
                aria-label="Open profile menu"
                onClick={() => setMenuOpen((open) => !open)}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#2b3328] text-sm font-black text-[#f6ffd9]"
              >
                {name.slice(0, 1).toUpperCase() || "G"}
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-12 w-48 rounded-3xl border border-[#e5eadb] bg-white p-2 shadow-xl shadow-emerald-900/10">
                  <MenuButton onClick={() => go("profile")}>Profile</MenuButton>
                  <MenuButton onClick={() => go("activity")}>Activity</MenuButton>
                  <MenuButton onClick={() => go("home")}>Home</MenuButton>
                  <MenuButton onClick={() => go("profile")}>Privacy lock</MenuButton>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
              <div
                key={`${day}-${index}`}
                className={`rounded-full py-2 text-center text-[11px] font-black ${
                  index === 1 ? "bg-[#2b3328] text-white" : "bg-[#f2f3e9] text-[#9aa291]"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-5 pb-24 pt-3">
          {screen === "home" && (
            <>
              <div className="rounded-[1.8rem] bg-[#b9e7ca] px-5 py-5 text-center">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#477450]">
                  One day at a time
                </p>
                <ProgressCircle value={0.68}>
                  <p className="text-5xl font-black leading-none">4</p>
                  <p className="mt-1 text-sm font-black uppercase">Days</p>
                </ProgressCircle>
                <p className="mt-3 text-sm font-bold text-[#477450]">
                  Focus: {habit}
                </p>
              </div>

              <div className="mt-4 space-y-3">
                <ListCard
                  title="Daily inventory"
                  subtitle={identity}
                  action="Open"
                  onClick={() => go("activity")}
                />
                <ListCard
                  title="Chance of relapse"
                  subtitle="Lower when you journal or reset"
                  action={`${Math.max(20, urge * 7)}%`}
                  onClick={() => go("reset")}
                />
              </div>

              <div className="mt-4 rounded-[1.6rem] bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#89937f]">
                  Habit focus
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {habits.map((item) => (
                    <Chip key={item} active={habit === item} onClick={() => setHabit(item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>

              <button
                onClick={() => go("reset")}
                className="mt-4 w-full rounded-[1.6rem] bg-[#2b3328] py-4 text-sm font-black uppercase tracking-[0.08em] text-[#f6ffd9]"
              >
                I am triggered
              </button>
            </>
          )}

          {screen === "reset" && (
            <Screen title="Quick reset" subtitle="Answer only what you can.">
              <Question title="Feeling">
                {feelings.map((item) => (
                  <Chip key={item} active={feeling === item} onClick={() => setFeeling(item)}>
                    {item}
                  </Chip>
                ))}
              </Question>

              <div className="mt-3 rounded-[1.6rem] bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#89937f]">
                  Urge level: {urge}/10
                </p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={urge}
                  onChange={(event) => setUrge(Number(event.target.value))}
                  className="mt-4 w-full accent-[#58a968]"
                />
              </div>

              <Question title="Trigger">
                {triggers.map((item) => (
                  <Chip key={item} active={trigger === item} onClick={() => setTrigger(item)}>
                    {item}
                  </Chip>
                ))}
              </Question>

              <button
                onClick={startTimer}
                className="mt-4 w-full rounded-[1.6rem] bg-[#92d967] py-4 text-sm font-black uppercase tracking-[0.08em]"
              >
                Start 10 min
              </button>
            </Screen>
          )}

          {screen === "timer" && (
            <Screen title={resetIdea} subtitle="Stay here until the timer ends.">
              <div className="rounded-[1.8rem] bg-[#c9f49a] p-5 text-center">
                <Buddy />
                <ProgressCircle value={timerProgress}>
                  <p className="text-4xl font-black leading-none">
                    {minutes}:{seconds}
                  </p>
                </ProgressCircle>
                <p className="mt-2 text-sm font-bold text-[#516b3c]">
                  Let the urge pass before deciding again.
                </p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setTimerRunning((running) => !running)}
                  className="rounded-[1.3rem] bg-white py-4 text-sm font-black shadow-sm"
                >
                  {timerRunning ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={() => {
                    setTimeLeft(timerLength);
                    setTimerRunning(true);
                  }}
                  className="rounded-[1.3rem] bg-white py-4 text-sm font-black shadow-sm"
                >
                  Restart
                </button>
              </div>

              <button
                onClick={finishTimer}
                className="mt-3 w-full rounded-[1.6rem] bg-[#2b3328] py-4 text-sm font-black uppercase tracking-[0.08em] text-[#f6ffd9]"
              >
                Finish
              </button>
            </Screen>
          )}

          {screen === "reflect" && (
            <Screen title="How is it now?" subtitle="No failure. Just pattern data.">
              <div className="rounded-[1.6rem] bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#89937f]">
                  After reset: {afterUrge}/10
                </p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={afterUrge}
                  onChange={(event) => setAfterUrge(Number(event.target.value))}
                  className="mt-4 w-full accent-[#58a968]"
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <Mini label="Before" value={`${urge}/10`} />
                <Mini label="Now" value={`${afterUrge}/10`} />
              </div>

              <ListCard
                title="Save reflection"
                subtitle="One hard moment does not erase progress"
                action="Save"
                onClick={saveReflection}
              />
            </Screen>
          )}

          {screen === "activity" && (
            <Screen title="Activity" subtitle="Private logs for your account.">
              <div className="space-y-3">
                {activities.map((item) => (
                  <ListCard
                    key={item.id}
                    title={item.title}
                    subtitle={item.subtitle}
                    action={item.value}
                    onClick={() => undefined}
                  />
                ))}
              </div>
            </Screen>
          )}

          {screen === "profile" && (
            <Screen title="Profile" subtitle={`${resetCount} private resets saved.`}>
              <div className="rounded-[1.6rem] bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#89937f]">
                  Name
                </p>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-3 w-full rounded-2xl bg-[#f2f3e9] px-4 py-3 text-sm font-black outline-none"
                />
              </div>

              <div className="mt-3 rounded-[1.6rem] bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#89937f]">
                  Daily intention
                </p>
                <input
                  value={identity}
                  onChange={(event) => setIdentity(event.target.value)}
                  className="mt-3 w-full rounded-2xl bg-[#f2f3e9] px-4 py-3 text-sm font-black outline-none"
                />
              </div>

              <div className="mt-3 space-y-3">
                {["Account", "Privacy lock", "Notifications", "Export data", "Delete data"].map((item) => (
                  <ListCard
                    key={item}
                    title={item}
                    subtitle="Coming in next build"
                    action="Open"
                    onClick={() => undefined}
                  />
                ))}
              </div>
            </Screen>
          )}
        </section>

        <footer className="fixed bottom-0 left-1/2 z-30 w-full max-w-[390px] -translate-x-1/2 border-t border-[#e5eadb] bg-[#fffdf3] px-5 pb-3 pt-2">
          <nav className="grid grid-cols-4 gap-1">
            <Tab label="Home" active={screen === "home"} onClick={() => go("home")} />
            <Tab label="Reset" active={["reset", "timer", "reflect"].includes(screen)} onClick={() => go("reset")} />
            <Tab label="Log" active={screen === "activity"} onClick={() => go("activity")} />
            <Tab label="Me" active={screen === "profile"} onClick={() => go("profile")} />
          </nav>
        </footer>
      </div>
    </main>
  );
}

function Screen({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h1 className="text-2xl font-black leading-tight">{title}</h1>
      <p className="mt-1 text-sm font-medium leading-6 text-[#747f6c]">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ProgressCircle({
  value,
  children,
}: {
  value: number;
  children: ReactNode;
}) {
  return (
    <div
      className="mx-auto mt-4 grid h-40 w-40 place-items-center rounded-full p-3 shadow-inner"
      style={{
        background: `conic-gradient(#2f8f4b ${value * 360}deg, rgba(255,255,255,0.58) 0deg)`,
      }}
    >
      <div className="grid h-full w-full place-items-center rounded-full bg-[#fffdf3] text-center">
        <div>{children}</div>
      </div>
    </div>
  );
}

function Question({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-3 rounded-[1.6rem] bg-white p-4 shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#89937f]">
        {title}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-h-10 rounded-full px-3 text-xs font-black ${
        active ? "bg-[#2b3328] text-[#f6ffd9]" : "bg-[#f2f3e9] text-[#747f6c]"
      }`}
    >
      {children}
    </button>
  );
}

function ListCard({
  title,
  subtitle,
  action,
  onClick,
}: {
  title: string;
  subtitle: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-[1.5rem] bg-white px-4 py-4 text-left shadow-sm"
    >
      <span>
        <span className="block text-sm font-black">{title}</span>
        <span className="mt-1 block text-xs font-medium leading-5 text-[#7a8472]">
          {subtitle}
        </span>
      </span>
      <span className="shrink-0 rounded-full bg-[#eef6d8] px-3 py-1 text-xs font-black text-[#4d7646]">
        {action}
      </span>
    </button>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.4rem] bg-white p-4 text-center shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.12em] text-[#89937f]">
        {label}
      </p>
      <p className="mt-1 text-2xl font-black">{value}</p>
    </div>
  );
}

function Tab({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-[1.1rem] px-2 py-2 text-[11px] font-black ${
        active ? "bg-[#2b3328] text-[#f6ffd9]" : "text-[#9aa291]"
      }`}
    >
      {label}
    </button>
  );
}

function MenuButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-black text-[#65715f] hover:bg-[#f2f3e9]"
    >
      {children}
    </button>
  );
}

function Buddy() {
  return (
    <div className="mx-auto h-20 w-20 rounded-[38%] bg-[#59b96b] shadow-lg shadow-emerald-900/10">
      <div className="relative h-full w-full">
        <div className="absolute left-6 top-7 h-2 w-2 rounded-full bg-[#1f2b1d]" />
        <div className="absolute right-6 top-7 h-2 w-2 rounded-full bg-[#1f2b1d]" />
        <div className="absolute bottom-6 left-1/2 h-3 w-6 -translate-x-1/2 rounded-b-full border-b-4 border-[#1f2b1d]" />
      </div>
    </div>
  );
}
