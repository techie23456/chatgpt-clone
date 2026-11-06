import express from "express";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import { ChatGoogle } from "@langchain/google";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Serves public/index.html at http://localhost:5000/
// (same origin as the API, so no CORS setup is needed)
app.use(express.static(path.join(__dirname, "public")));

const model = new ChatGoogle("gemma-4-31b-it"); // or "gemini-2.5-flash"
//app.post("/api/query", async (req, res)
app.("/api", async (req, res) => {

  console.log(req.body)
  const { query } = req.body || {};

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ error: "Query is required." });
  }

  try {
    const result = await model.invoke(query.trim());
    const text =
      result.text ??
      (typeof result.content === "string"
        ? result.content
        : JSON.stringify(result.content));

    res.json({ response: text });
  } catch (err) {
    console.error("Model error:", err);
    res.status(500).json({ error: "The model request failed." });
  }
});

app.listen(port, () => {
  console.log("server started at", port);
});
