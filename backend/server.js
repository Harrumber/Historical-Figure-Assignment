import express from "express";
import cors from "cors";
import conversationRoutes from "./routes/conversation.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "historical-figure-backend" });
});

app.get("/", (_req, res) => {
    res.json({ message: "Bob Marley backend is running. Try /api/heath or /api/conversation/profile" });
});

app.use("/api/conversation", conversationRoutes);

// 404 fallback for unknown routes
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found." });
});

app.listen(PORT, () => {
  console.log(`Express backend running at http://localhost:${PORT}`);
});
