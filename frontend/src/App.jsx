import { useEffect, useState } from "react";
import IntroScreen from "./components/IntroScreen";
import ChatScreen from "./components/ChatScreen";
import "./App.css";

export default function App() {
  const [profile, setProfile] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unlockedFacts, setUnlockedFacts] = useState([]);
  const [latestFact, setLatestFact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);
  const [error, setError] = useState(null);

  // Initial profile fetch
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
        setServerOnline(true);
      } catch (err) {
        setServerOnline(false);
        setError(err.message || "Could not connect to backend server.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Live backend status check (Online / Offline microinteraction)
  useEffect(() => {
    async function checkHealth() {
      try {
        const res = await fetch("/api/health");
        setServerOnline(res.ok);
      } catch {
        setServerOnline(false);
      }
    }

    const interval = setInterval(checkHealth, 8000);
    return () => clearInterval(interval);
  }, []);

  function pause(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
      setMessages([]);
      setUnlockedFacts([]);
      setLatestFact(null);
      setIsTyping(true);

      await pause(750);

      setMessages([{ sender: "figure", text: startNode.text }]);
      if (startNode.factUnlocked) {
        setUnlockedFacts([startNode.factUnlocked]);
        setLatestFact(startNode.factUnlocked);
      }
    } catch (err) {
      setError(err.message || "Could not load conversation node.");
    } finally {
      setIsTyping(false);
      setLoading(false);
    }
  }

  async function handleSelectChoice(choice, choiceIndex) {
    if (!currentNode || isTyping) return;

    // Immediately show user's message + typing bubble for instant feedback
    setMessages((prev) => [...prev, { sender: "user", text: choice.label }]);
    setIsTyping(true);
    setError(null);

    try {
      const [res] = await Promise.all([
        fetch("/api/conversation/step", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentNodeId: currentNode.id,
            choiceIndex
          })
        }),
        pause(900)
      ]);

      if (!res.ok) {
        throw new Error(`Failed to advance conversation (${res.status})`);
      }

      const { nextNode } = await res.json();

      setMessages((prev) => [...prev, { sender: "figure", text: nextNode.text }]);

      if (nextNode.factUnlocked && !unlockedFacts.includes(nextNode.factUnlocked)) {
        setUnlockedFacts((prev) => [...prev, nextNode.factUnlocked]);
        setLatestFact(nextNode.factUnlocked);
      }

      setCurrentNode(nextNode);
    } catch (err) {
      setError(err.message || "Error advancing conversation.");
    } finally {
      setIsTyping(false);
    }
  }

  function handleRestart() {
    setCurrentNode(null);
    setMessages([]);
    setUnlockedFacts([]);
    setLatestFact(null);
    setIsTyping(false);
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
            <button
              type="button"
              className="secondary-btn"
              onClick={() => window.location.reload()}
            >
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
            latestFact={latestFact}
            isTyping={isTyping}
            serverOnline={serverOnline}
            onSelectChoice={handleSelectChoice}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}