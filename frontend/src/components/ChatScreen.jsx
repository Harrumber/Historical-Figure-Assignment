import { useEffect, useRef } from "react";
import "./ChatScreen.css";

export default function ChatScreen({
  figureName,
  messages,
  currentNode,
  unlockedFacts,
  latestFact,
  isTyping,
  serverOnline,
  onSelectChoice,
  onRestart
}) {
  const feedEndRef = useRef(null);

  // Smoothly scroll to bottom whenever messages or typing indicator change
  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="chat-layout">
      <section className="chat-main" aria-label="Conversation">
        <div className="chat-topbar">
          <div>
            <div className="figure-heading-row">
              <h2>Conversing with {figureName}</h2>
              <span
                className={`status-pill ${serverOnline ? "online" : "offline"}`}
                aria-live="polite"
              >
                <span className="status-dot" />
                {serverOnline ? "Online" : "Offline"}
              </span>
            </div>
            <span className="node-meta">
              {currentNode.era} · {currentNode.location}
            </span>
          </div>
          <button type="button" className="secondary-btn" onClick={onRestart}>
            Restart
          </button>
        </div>

        <div className="message-feed">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-bubble bubble-enter ${
                msg.sender === "user" ? "user-msg" : "figure-msg"
              }`}
            >
              <span className="sender-label">
                {msg.sender === "user" ? "You" : figureName}
              </span>
              <p>{msg.text}</p>
            </div>
          ))}

          {isTyping && (
            <div
              className="message-bubble figure-msg typing-bubble bubble-enter"
              aria-label={`${figureName} is typing`}
            >
              <span className="sender-label">{figureName} is typing</span>
              <div className="typing-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          )}

          <div ref={feedEndRef} />
        </div>

        <div className="choices-panel">
          {!currentNode.isEnding ? (
            <>
              <h3>
                {isTyping ? `${figureName} is responding...` : "Choose your response:"}
              </h3>
              <div className="choice-buttons">
                {currentNode.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="choice-btn"
                    disabled={isTyping}
                    onClick={() => onSelectChoice(choice, idx)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            !isTyping && (
              <div className="ending-box bubble-enter">
                <h3>Conversation Path Complete</h3>
                <p>
                  You uncovered {unlockedFacts.length} historical insight
                  {unlockedFacts.length === 1 ? "" : "s"} in this session.
                </p>
                <button type="button" className="primary-btn" onClick={onRestart}>
                  Explore Another Topic
                </button>
              </div>
            )
          )}
        </div>
      </section>

      <aside className="context-sidebar" aria-label="Historical Context">
        <h3>Historical Context</h3>
        <div className="context-card">
          <p>
            <strong>Era:</strong> {currentNode.era}
          </p>
          <p>
            <strong>Setting:</strong> {currentNode.location}
          </p>
        </div>

        <h3>Unlocked Facts ({unlockedFacts.length})</h3>
        <ul className="facts-list">
          {unlockedFacts.map((fact, idx) => (
            <li
              key={idx}
              className={fact === latestFact ? "fact-card fact-new" : "fact-card"}
            >
              {fact}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}