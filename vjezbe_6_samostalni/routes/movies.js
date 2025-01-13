import express from "express";
const router = express.Router();
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "movies.json");

export async function readMoviesFile() {
  const data = await fs.readFile(dataPath, "utf8");
  return JSON.parse(data);
}

router.get("/", async (req, res) => {
  try {
    const movies = await readMoviesFile();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error reading movies." });
  }
});
router.get("/:id", async (req, res) => {});
router.post("/", async (req, res) => {});
router.patch("/", async (req, res) => {});

export default router;
