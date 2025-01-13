import express from "express";
const router = express.Router();
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "actors.json");

export async function readActorsFile() {
  const data = await fs.readFile(dataPath, "utf8");
  return JSON.parse(data);
}

router.get("/", async (req, res) => {
  try {
    const actors = await readActorsFile();
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: "Error reading actors." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const actorId = parseInt(req.params.id, 10);
    const actors = await readActorsFile();

    const actor = actors.find((m) => m.id === actorId);
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: "Error reading actors." });
  }
});

router.post("/", async (req, res) => {});
router.patch("/", async (req, res) => {});

export default router;
