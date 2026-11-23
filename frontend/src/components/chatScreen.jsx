import "./chatScreen.css";

export default function ChatScreen({
  figureName,
  messages,
  currentNode,
  unlockedFacts,
  onSelectChoice,
  onRestart
}) {
  return (
    <div className="chat-layout">
      <section className="chat-main" aria-label="Conversation">
        <div className="chat-topbar">
          <div>
            <h2>Conversing with {figureName}</h2>
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
              className={`message-bubble ${
                msg.sender === "user" ? "user-msg" : "figure-msg"
              }`}
            >
              <span className="sender-label">
                {msg.sender === "user" ? "You" : figureName}
              </span>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="choices-panel">
          {!currentNode.isEnding ? (
            <>
              <h3>Choose your response:</h3>
              <div className="choice-buttons">
                {currentNode.choices.map((choice, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="choice-btn"
                    onClick={() => onSelectChoice(choice)}
                  >
                    {choice.label}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="ending-box">
              <h3>Conversation Path Complete</h3>
              <p>
                You uncovered {unlockedFacts.length} historical insight
                {unlockedFacts.length === 1 ? "" : "s"} in this session.
              </p>
              <button type="button" className="primary-btn" onClick={onRestart}>
                Explore Another Topic
              </button>
            </div>
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
            <li key={idx}>{fact}</li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
