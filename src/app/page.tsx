"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

type Screen = "today" | "check" | "timer" | "reflect" | "activity" | "profile";

type Activity = {
  id: number;
  title: string;
  note: string;
  result: string;
};

const habits = ["Social media", "Smoking", "Porn", "Gaming", "Junk food", "Spending"];
const feelings = ["Bored", "Stressed", "Lonely", "Anxious", "Angry", "Automatic"];
const triggers = ["Phone", "Being alone", "Late night", "Work", "Social media", "Unknown"];
const resetActions = [
  "Go for a slow walk",
  "Drink water and wash your face",
  "Move to another room",
  "Play one calm song",
  "Clean one small space",
  "Message a trusted person",
];

const days = [
  ["Mon", "30"],
  ["Tue", "01"],
  ["Wed", "02"],
  ["Thu", "03"],
  ["Fri", "04"],
  ["Sat", "05"],
];

const timerLength = 10 * 60;

export default function Home() {
  const [screen, setScreen] = useState<Screen>("today");
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("Vicky");
  const [habit, setHabit] = useState(habits[0]);
  const [identity, setIdentity] = useState("A calmer person");
  const [feeling, setFeeling] = useState(feelings[0]);
  const [trigger, setTrigger] = useState(triggers[0]);
  const [urge, setUrge] = useState(7);
  const [afterUrge, setAfterUrge] = useState(4);
  const [timeLeft, setTimeLeft] = useState(timerLength);
  const [timerRunning, setTimerRunning] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: 1,
      title: "Reset completed",
      note: "Late night phone urge",
      result: "8 to 5",
    },
    {
      id: 2,
      title: "Daily note",
      note: "Boredom was the main trigger",
      result: "Saved",
    },
  ]);

  const resetAction = useMemo(() => {
    const seed = feeling.length + trigger.length + urge;
    return resetActions[seed % resetActions.length];
  }, [feeling, trigger, urge]);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const progress = 1 - timeLeft / timerLength;

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

  function go(nextScreen: Screen) {
    setMenuOpen(false);
    setScreen(nextScreen);
  }

  function startTimer() {
    setTimeLeft(timerLength);
    setTimerRunning(true);
    go("timer");
  }

  function saveReflection() {
    setActivities((items) => [
      {
        id: Date.now(),
        title: "Reset completed",
        note: `${habit}, ${feeling.toLowerCase()}, ${trigger.toLowerCase()}`,
        result: `${urge} to ${afterUrge}`,
      },
      ...items,
    ]);
    go("activity");
  }

  return (
    <main className="min-h-screen bg-[#dff1df] px-3 py-4 text-[#172317] sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-[420px] flex-col overflow-hidden rounded-[2.4rem] border border-white/80 bg-[#fbfbef] shadow-2xl shadow-emerald-900/20">
        <header className="relative z-30 px-5 pb-3 pt-4">
          <div className="flex items-center justify-between">
            <button onClick={() => go("today")} className="text-left">
              <p className="text-xs font-bold text-[#74806e]">Good morning,</p>
              <p className="text-2xl font-black tracking-normal">{userName}</p>
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((open) => !open)}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#1d261d] text-sm font-black text-[#f4ffd5]"
                aria-label="Open profile menu"
              >
                {userName.slice(0, 1).toUpperCase() || "G"}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-13 w-52 rounded-3xl border border-[#d8decf] bg-white p-2 shadow-xl shadow-emerald-900/15">
                  <MenuItem onClick={() => go("profile")}>Profile</MenuItem>
                  <MenuItem onClick={() => go("activity")}>Activity</MenuItem>
                  <MenuItem onClick={() => go("today")}>Today</MenuItem>
                  <MenuItem onClick={() => go("profile")}>Privacy lock</MenuItem>
                </div>
              )}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-6 gap-2">
            {days.map(([day, date], index) => (
              <div
                key={date}
                className={`rounded-2xl px-1 py-2 text-center ${
                  index === 1 ? "bg-[#1d261d] text-white" : "bg-white text-[#7b8274]"
                }`}
              >
                <p className="text-[10px] font-bold">{day}</p>
                <p className="mt-1 text-sm font-black">{date}</p>
              </div>
            ))}
          </div>
        </header>

        <section className="flex-1 overflow-y-auto px-5 pb-28 pt-2">
          {screen === "today" && (
            <div>
              <HeroResetCard onStart={() => go("check")} />

              <SoftCard className="mt-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#819075]">
                      Habit focus
                    </p>
                    <p className="mt-1 text-xl font-black">{habit}</p>
                  </div>
                  <button
                    onClick={() => go("check")}
                    className="rounded-full bg-[#c9f45f] px-4 py-2 text-sm font-black"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
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
              </SoftCard>

              <SoftCard className="mt-4 bg-[#f7df8d]">
                <div className="flex items-center gap-4">
                  <Companion />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-[#77672a]">
                      Identity
                    </p>
                    <input
                      value={identity}
                      onChange={(event) => setIdentity(event.target.value)}
                      className="mt-1 w-full bg-transparent text-xl font-black outline-none"
                    />
                  </div>
                </div>
              </SoftCard>

              <button
                onClick={() => go("activity")}
                className="mt-4 w-full rounded-[1.6rem] bg-white px-5 py-4 text-left text-sm font-bold text-[#67715f] shadow-sm"
              >
                View private activity
              </button>
            </div>
          )}

          {screen === "check" && (
            <ScreenPanel title="What do you feel?" eyebrow="Trigger check">
              <Picker title="Feeling">
                {feelings.map((item) => (
                  <Choice
                    key={item}
                    active={feeling === item}
                    onClick={() => setFeeling(item)}
                  >
                    {item}
                  </Choice>
                ))}
              </Picker>

              <SoftCard className="mt-4">
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#819075]">
                  Urge strength: {urge}/10
                </p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={urge}
                  onChange={(event) => setUrge(Number(event.target.value))}
                  className="mt-4 w-full accent-[#4da65a]"
                />
              </SoftCard>

              <Picker title="Trigger">
                {triggers.map((item) => (
                  <Choice
                    key={item}
                    active={trigger === item}
                    onClick={() => setTrigger(item)}
                  >
                    {item}
                  </Choice>
                ))}
              </Picker>

              <button
                onClick={startTimer}
                className="mt-5 w-full rounded-[1.6rem] bg-[#1d261d] px-5 py-5 text-base font-black text-[#f4ffd5]"
              >
                Start 10-minute reset
              </button>
            </ScreenPanel>
          )}

          {screen === "timer" && (
            <ScreenPanel title="Go for reset" eyebrow="Timer">
              <div className="rounded-[2rem] bg-[#bbed7d] p-5 text-center">
                <button
                  onClick={() => go("check")}
                  className="float-right rounded-full bg-white/55 px-3 py-1 text-sm font-black"
                >
                  x
                </button>
                <Companion large />
                <h2 className="mt-3 text-2xl font-black">{resetAction}</h2>

                <div
                  className="mx-auto mt-5 grid h-52 w-52 place-items-center rounded-full shadow-inner"
                  style={{
                    background: `conic-gradient(#326b38 ${progress * 360}deg, rgba(255,255,255,0.62) 0deg)`,
                  }}
                >
                  <div className="grid h-40 w-40 place-items-center rounded-full bg-[#fbfbef]">
                    <p className="text-5xl font-black">
                      {minutes}:{seconds}
                    </p>
                  </div>
                </div>
              </div>

              <SoftCard className="mt-4">
                <p className="text-sm font-bold text-[#67715f]">
                  Give this action a real 10 minutes before deciding again.
                </p>
              </SoftCard>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTimerRunning((running) => !running)}
                  className="rounded-[1.4rem] bg-white px-4 py-4 font-black"
                >
                  {timerRunning ? "Pause" : "Resume"}
                </button>
                <button
                  onClick={() => {
                    setTimeLeft(timerLength);
                    setTimerRunning(true);
                  }}
                  className="rounded-[1.4rem] bg-white px-4 py-4 font-black"
                >
                  Restart
                </button>
              </div>

              <button
                onClick={() => {
                  setTimerRunning(false);
                  go("reflect");
                }}
                className="mt-3 w-full rounded-[1.6rem] bg-[#1d261d] px-5 py-5 text-base font-black text-[#f4ffd5]"
              >
                Finish
              </button>
            </ScreenPanel>
          )}

          {screen === "reflect" && (
            <ScreenPanel title="How is it now?" eyebrow="Reflection">
              <SoftCard>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#819075]">
                  Urge after reset: {afterUrge}/10
                </p>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={afterUrge}
                  onChange={(event) => setAfterUrge(Number(event.target.value))}
                  className="mt-4 w-full accent-[#4da65a]"
                />
              </SoftCard>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <ResultCard label="Before" value={`${urge}/10`} />
                <ResultCard label="Now" value={`${afterUrge}/10`} />
              </div>

              <SoftCard className="mt-4">
                <p className="text-sm leading-6 text-[#66715f]">
                  One difficult moment does not erase progress. Save it as a
                  private pattern, not a failure.
                </p>
              </SoftCard>

              <button
                onClick={saveReflection}
                className="mt-5 w-full rounded-[1.6rem] bg-[#1d261d] px-5 py-5 text-base font-black text-[#f4ffd5]"
              >
                Save activity
              </button>
            </ScreenPanel>
          )}

          {screen === "activity" && (
            <ScreenPanel title="Private activity" eyebrow="History">
              <div className="space-y-3">
                {activities.map((activity) => (
                  <SoftCard key={activity.id}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-black">{activity.title}</p>
                        <p className="mt-1 text-sm text-[#7b8274]">
                          {activity.note}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#dff7a4] px-3 py-1 text-sm font-black">
                        {activity.result}
                      </span>
                    </div>
                  </SoftCard>
                ))}
              </div>
            </ScreenPanel>
          )}

          {screen === "profile" && (
            <ScreenPanel title="Your space" eyebrow="Profile">
              <SoftCard>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-[#819075]">
                  Name
                </p>
                <input
                  value={userName}
                  onChange={(event) => setUserName(event.target.value)}
                  className="mt-3 w-full rounded-2xl bg-[#f1f3e6] px-4 py-3 font-black outline-none"
                />
              </SoftCard>

              <div className="mt-4 grid gap-3">
                {["Account", "Privacy lock", "Notifications", "Export data", "Delete data"].map((item) => (
                  <button
                    key={item}
                    className="flex items-center justify-between rounded-[1.4rem] bg-white px-4 py-4 text-left font-black shadow-sm"
                  >
                    <span>{item}</span>
                    <span className="text-[#9ca58f]">&gt;</span>
                  </button>
                ))}
              </div>
            </ScreenPanel>
          )}
        </section>

        <footer className="fixed bottom-4 left-1/2 z-40 w-[calc(100%-2rem)] max-w-[390px] -translate-x-1/2 rounded-[1.8rem] bg-[#1d261d] p-2 shadow-2xl shadow-emerald-900/25">
          <nav className="grid grid-cols-4 gap-1">
            <Tab active={screen === "today"} onClick={() => go("today")} label="Home" />
            <Tab active={["check", "timer", "reflect"].includes(screen)} onClick={() => go("check")} label="Reset" />
            <Tab active={screen === "activity"} onClick={() => go("activity")} label="Log" />
            <Tab active={screen === "profile"} onClick={() => go("profile")} label="Profile" />
          </nav>
        </footer>
      </div>
    </main>
  );
}

function HeroResetCard({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-[2.2rem] bg-[#1d261d] p-5 text-[#f4ffd5]">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#c9f45f]/25" />
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#c9f45f]">
        One moment at a time
      </p>
      <h1 className="mt-3 max-w-[12rem] text-4xl font-black leading-[0.95]">
        Need a reset?
      </h1>
      <p className="mt-3 max-w-[13rem] text-sm leading-6 text-[#d7e8ce]/75">
        Start small. Let the urge pass.
      </p>
      <button
        onClick={onStart}
        className="mt-6 rounded-full bg-[#c9f45f] px-5 py-3 text-sm font-black text-[#172317]"
      >
        I am triggered
      </button>
      <div className="absolute bottom-5 right-5">
        <Companion />
      </div>
    </div>
  );
}

function ScreenPanel({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-black text-[#4f8f54]">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-black leading-tight">{title}</h1>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Picker({ title, children }: { title: string; children: ReactNode }) {
  return (
    <SoftCard className="mt-4">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#819075]">
        {title}
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">{children}</div>
    </SoftCard>
  );
}

function SoftCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[1.6rem] bg-white p-4 shadow-sm ${className}`}>
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
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl px-3 py-3 text-left text-sm font-black transition ${
        active ? "bg-[#1d261d] text-[#f4ffd5]" : "bg-[#f1f3e6] text-[#66715f]"
      }`}
    >
      {children}
    </button>
  );
}

function ResultCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] bg-white p-4 text-center shadow-sm">
      <p className="text-xs font-black uppercase tracking-[0.14em] text-[#819075]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black">{value}</p>
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
      className={`rounded-[1.3rem] px-2 py-3 text-xs font-black ${
        active ? "bg-[#f4ffd5] text-[#172317]" : "text-[#f4ffd5]/55"
      }`}
    >
      {label}
    </button>
  );
}

function MenuItem({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl px-4 py-3 text-left text-sm font-black text-[#66715f] hover:bg-[#f1f3e6]"
    >
      {children}
    </button>
  );
}

function Companion({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`relative rounded-[36%] bg-[#55b463] shadow-lg shadow-emerald-900/15 ${
        large ? "mx-auto h-28 w-28" : "h-20 w-20"
      }`}
    >
      <div className="absolute left-[28%] top-[35%] h-2 w-2 rounded-full bg-[#172317]" />
      <div className="absolute right-[28%] top-[35%] h-2 w-2 rounded-full bg-[#172317]" />
      <div className="absolute bottom-[28%] left-1/2 h-3 w-6 -translate-x-1/2 rounded-b-full border-b-4 border-[#172317]" />
      <div className="absolute -right-2 top-5 h-5 w-5 rotate-12 rounded-full bg-[#c9f45f]" />
      <div className="absolute -left-2 bottom-5 h-5 w-5 -rotate-12 rounded-full bg-[#c9f45f]" />
    </div>
  );
}
