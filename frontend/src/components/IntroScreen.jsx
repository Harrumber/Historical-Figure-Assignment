import { useState } from "react";
import "./IntroScreen.css";

export default function IntroScreen({ profile, onStart }) {
  const [selectedTopic, setSelectedTopic] = useState(profile.topics[0]?.id || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedTopic) return;
    onStart(selectedTopic);
  }

  return (
    <section className="intro-card">
      <div className="intro-header">
        <div className="portrait-placeholder" aria-hidden="true">
          BM
        </div>
        <div>
          <span className="era-badge">{profile.years}</span>
          <h2>{profile.name}</h2>
          <p className="tagline">{profile.tagline}</p>
        </div>
      </div>

      <p className="intro-bio">{profile.intro}</p>

      <form onSubmit={handleSubmit} className="topic-form">
        <h3>Choose a Starting Topic</h3>
        <div className="topic-list">
          {profile.topics.map((topic) => (
            <label
              key={topic.id}
              className={`topic-option ${
                selectedTopic === topic.id ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name="topic"
                value={topic.id}
                checked={selectedTopic === topic.id}
                onChange={() => setSelectedTopic(topic.id)}
              />
              <div>
                <strong>{topic.title}</strong>
                <p>{topic.description}</p>
              </div>
            </label>
          ))}
        </div>

        <button type="submit" className="primary-btn">
          Start Conversation
        </button>
      </form>
    </section>
  );
}