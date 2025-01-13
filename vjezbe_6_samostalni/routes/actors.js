import express from "express";
const router = express.Router();
import fs from "fs/promises";
import path from "path";
import {
  validateActorById,
  validateActor,
  validateAndSanitizeName,
  validateId,
} from "../middleware/actors.js";

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
const getActors = () => actors;

router.get("/", validateAndSanitizeName, (req, res) => {
  const { name } = req.query;

  if (name) {
    const filteredActors = actors.filter((actor) =>
      actor.name.toLowerCase().includes(name.toLowerCase())
    );
    return res.json(filteredActors);
  }

  res.json(actors);
});

router.get("/:id", validateId, validateActorById(getActors), (req, res) => {
  res.json(req.actor);
});

router.post("/", validateActor, (req, res) => {
  try {
    const { id, name, birthYear, movies: actorMovies } = req.body;

    if (actors.some((a) => a.id === id)) {
      return res
        .status(400)
        .json({ error: `Actor with id=${id} already exists.` });
    }

    const newActor = { id, name, birthYear, movies: actorMovies };
    actors.push(newActor);

    return res.status(201).json(newActor);
  } catch (error) {
    res.status(500).json({ error: "Error adding new actor in memory." });
  }
});

router.patch("/:id", validateActor, (req, res) => {
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
