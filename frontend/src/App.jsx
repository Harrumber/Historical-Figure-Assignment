import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import ChatScreen from "./components/ChatScreen";
import "./App.css";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unlockedFacts, setUnlockedFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/conversation/profile");
        if (!res.ok) {
          throw new Error(`Failed to load profile (${res.status})`);
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err.message || "Could not connect to backend server.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  async function handleStart(topicId) {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/conversation/node/${topicId}`);
      if (!res.ok) {
        throw new Error(`Failed to start topic (${res.status})`);
      }
      const startNode = await res.json();

      setCurrentNode(startNode);
      setMessages([{ sender: "figure", text: startNode.text }]);
      setUnlockedFacts(startNode.factUnlocked ? [startNode.factUnlocked] : []);
    } catch (err) {
      setError(err.message || "Could not load conversation node.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSelectChoice(_choice, choiceIndex) {
    if (!currentNode) return;

    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/conversation/step", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentNodeId: currentNode.id,
          choiceIndex
        })
      });

      if (!res.ok) {
        throw new Error(`Failed to advance conversation (${res.status})`);
      }

      const { chosenLabel, nextNode } = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "user", text: chosenLabel },
        { sender: "figure", text: nextNode.text }
      ]);

      if (nextNode.factUnlocked && !unlockedFacts.includes(nextNode.factUnlocked)) {
        setUnlockedFacts((prev) => [...prev, nextNode.factUnlocked]);
      }

      setCurrentNode(nextNode);
    } catch (err) {
      setError(err.message || "Error advancing conversation.");
    } finally {
      setLoading(false);
    }
  }

  function handleRestart() {
    setCurrentNode(null);
    setMessages([]);
    setUnlockedFacts([]);
    setError(null);
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Voices of History · Interactive Experience</h1>
        <p>Explore the life, music, and message of Bob Marley</p>
      </header>

      <main className="app-content">
        {error && (
          <div className="error-banner" role="alert">
            <p>
              <strong>Notice:</strong> {error}
            </p>
            <button type="button" className="secondary-btn" onClick={() => window.location.reload()}>
              Reload
            </button>
          </div>
        )}

        {loading && !profile && <p>Loading historical experience...</p>}

        {profile && !currentNode && (
          <IntroScreen profile={profile} onStart={handleStart} />
        )}

        {profile && currentNode && (
          <ChatScreen
            figureName={profile.name}
            messages={messages}
            currentNode={currentNode}
            unlockedFacts={unlockedFacts}
            onSelectChoice={handleSelectChoice}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}