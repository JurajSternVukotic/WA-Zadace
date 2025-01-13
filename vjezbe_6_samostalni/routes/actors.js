import express from "express";
const router = express.Router();
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "actors.json");
let actors = [];

(async function initActors() {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    actors = JSON.parse(data);
    console.log("Actors loaded into memory:", actors);
  } catch (error) {
    console.error("Error loading actors file:", error.message);
    actors = [];
  }
})();

router.get("/", async (req, res) => {
  try {
    res.json(actors);
  } catch (error) {
    res.status(500).json({ error: "Error reading actors in memory." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const actorId = parseInt(req.params.id, 10);
    const actor = actors.find((a) => a.id === actorId);

    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the actor from memory." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, name, birthYear, movies: actorMovies } = req.body;

    if (!id || !name || !birthYear || !actorMovies) {
      return res.status(400).json({
        error: "All fields (id, name, birthYear, movies) are required.",
      });
    }

    if (actors.some((a) => a.id === id)) {
      return res
        .status(400)
        .json({ error: `Actor with id=${id} already exists.` });
    }

    const newActor = {
      id,
      name,
      birthYear,
      movies: actorMovies,
    };
    actors.push(newActor);

    return res.status(201).json(newActor);
  } catch (error) {
    res.status(500).json({ error: "Error adding new actor in memory." });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const actorId = parseInt(req.params.id, 10);
    const actorIndex = actors.findIndex((a) => a.id === actorId);

    if (actorIndex === -1) {
      return res.status(404).json({ error: "Actor not found" });
    }

    const { name, birthYear, movies: actorMovies } = req.body;
    if (name !== undefined) actors[actorIndex].name = name;
    if (birthYear !== undefined) actors[actorIndex].birthYear = birthYear;
    if (actorMovies !== undefined) actors[actorIndex].movies = actorMovies;

    return res.json(actors[actorIndex]);
  } catch (error) {
    res.status(500).json({ error: "Error updating the actor in memory." });
  }
});

export default router;
