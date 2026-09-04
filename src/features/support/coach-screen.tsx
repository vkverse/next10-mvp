"use client";

import { FormEvent, useState } from "react";
import { useSupportLibrary } from "@/hooks/use-support-library";

export function CoachScreen() {
  const library = useSupportLibrary();
  const [messages, setMessages] = useState([
    {
      role: "coach",
      text: "Ask me about FocusFlow, planning, distraction, habits, or getting unstuck. My answers come from a reviewed local library.",
    },
  ]);
  const [text, setText] = useState("");

  function send(event: FormEvent) {
    event.preventDefault();
    if (!text.trim()) return;
    const question = text.trim();
    const match = library.answer(question);
    const answer = match
      ? match.answer +
        "\n\nNext action: " +
        match.action +
        (match.caution ? "\n\n" + match.caution : "")
      : "I don’t have a reviewed answer for that yet. Try asking about starting a task, distraction, habits, smoking urges, feeling low, privacy, or focus sessions.";
    setMessages((items) => [
      ...items,
      { role: "user", text: question },
      { role: "coach", text: answer },
    ]);
    setText("");
  }

  return (
    <div className="coach">
      <div className="coach-head">
        <div className="orb" />
        <span className="eyebrow">Local support guide</span>
        <h1>Let’s make the next step lighter.</h1>
        <p>No generative AI. Answers come from a reviewed YAML knowledge library.</p>
      </div>
      <div className="chat">
        {messages.map((message, index) => (
          <div className={message.role === "user" ? "bubble user" : "bubble"} key={index}>
            {message.text}
            {message.role === "coach" && <small>Reviewed local response</small>}
          </div>
        ))}
      </div>
      <div className="suggestions">
        {["I cannot start", "I want to smoke", "How is my data stored?"].map((suggestion) => (
          <button key={suggestion} onClick={() => setText(suggestion)}>
            {suggestion}
          </button>
        ))}
      </div>
      <form className="chat-form" onSubmit={send}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Ask a supported question…"
          aria-label="Ask the support guide"
        />
        <button aria-label="Send question">↑</button>
      </form>
    </div>
  );
}
