import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/bobMarleyDialogue.json");

function loadDialogueData() {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

// GET /api/conversation/profile
router.get("/profile", (_req, res) => {
  try {
    const data = loadDialogueData();
    res.json(data.profile);
  } catch (err) {
    console.error("Failed to load profile:", err);
    res.status(500).json({ error: "Unable to load historical figure profile." });
  }
});

// GET /api/conversation/node/:nodeId
router.get("/node/:nodeId", (req, res) => {
  const { nodeId } = req.params;

  // Basic allowlist validation for node IDs (letters, numbers, underscores, hyphens)
  if (!/^[a-zA-Z0-9_-]{1,64}$/.test(nodeId)) {
    return res.status(400).json({ error: "Invalid conversation node ID format." });
  }

  try {
    const data = loadDialogueData();
    const node = data.nodes[nodeId];

    if (!node) {
      return res.status(404).json({ error: `Conversation node '${nodeId}' not found.` });
    }

    res.json(node);
  } catch (err) {
    console.error("Failed to load node:", err);
    res.status(500).json({ error: "Unable to retrieve conversation node." });
  }
});

// POST /api/conversation/step
// Accepts { currentNodeId, choiceIndex } and returns the next node on the server
router.post("/step", (req, res) => {
  const { currentNodeId, choiceIndex } = req.body ?? {};

  if (
    typeof currentNodeId !== "string" ||
    !/^[a-zA-Z0-9_-]{1,64}$/.test(currentNodeId) ||
    !Number.isInteger(choiceIndex) ||
    choiceIndex < 0
  ) {
    return res.status(400).json({
      error: "Invalid request payload. Expected currentNodeId and non-negative choiceIndex."
    });
  }

  try {
    const data = loadDialogueData();
    const currentNode = data.nodes[currentNodeId];

    if (!currentNode) {
      return res.status(404).json({ error: "Current conversation node not found." });
    }

    const chosenOption = currentNode.choices?.[choiceIndex];
    if (!chosenOption) {
      return res.status(400).json({ error: "Selected choice is not valid for this node." });
    }

    const nextNode = data.nodes[chosenOption.nextId];
    if (!nextNode) {
      return res.status(404).json({ error: "Target next conversation node not found." });
    }

    res.json({
      chosenLabel: chosenOption.label,
      nextNode
    });
  } catch (err) {
    console.error("Failed to process conversation step:", err);
    res.status(500).json({ error: "Error advancing conversation." });
  }
});

export default router;