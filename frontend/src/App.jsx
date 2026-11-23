import { useState } from "react";
import { bobMarleyProfile, dialogueNodes } from "./data/mockDialogue";
import IntroScreen from "./components/introScreen";
import ChatScreen from "./components/chatScreen";
import "./App.css";

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unlockedFacts, setUnlockedFacts] = useState([]);

  function handleStart(topicId) {
    const startNode = dialogueNodes[topicId];
    if (!startNode) return;

    setCurrentNodeId(topicId);
    setMessages([{ sender: "figure", text: startNode.text }]);
    setUnlockedFacts(startNode.factUnlocked ? [startNode.factUnlocked] : []);
  }

  function handleSelectChoice(choice) {
    const nextNode = dialogueNodes[choice.nextId];
    if (!nextNode) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: choice.label },
      { sender: "figure", text: nextNode.text }
    ]);

    if (nextNode.factUnlocked && !unlockedFacts.includes(nextNode.factUnlocked)) {
      setUnlockedFacts((prev) => [...prev, nextNode.factUnlocked]);
    }

    setCurrentNodeId(choice.nextId);
  }

  function handleRestart() {
    setCurrentNodeId(null);
    setMessages([]);
    setUnlockedFacts([]);
  }

  const currentNode = currentNodeId ? dialogueNodes[currentNodeId] : null;

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Voices of History · Interactive Experience</h1>
        <p>Explore the life, music, and message of Bob Marley</p>
      </header>

      <main className="app-content">
        {!currentNode ? (
          <IntroScreen profile={bobMarleyProfile} onStart={handleStart} />
        ) : (
          <ChatScreen
            figureName={bobMarleyProfile.name}
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
