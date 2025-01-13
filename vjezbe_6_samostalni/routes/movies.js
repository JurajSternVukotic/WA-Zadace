import express from "express";
const router = express.Router();
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "movies.json");

let movies = [];

(async function initMovies() {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    movies = JSON.parse(data);
    console.log("Movies loaded into memory:", movies);
  } catch (error) {
    console.error("Error loading movies file:", error.message);
    movies = [];
  }
})();

router.get("/", async (req, res) => {
  try {
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error reading movies in memory." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving the movie from memory." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, title, year, genre, director } = req.body;

    if (!id || !title || !year || !genre || !director) {
      return res.status(400).json({
        error: "All fields (id, title, year, genre, director) are required.",
      });
    }

    if (movies.some((m) => m.id === id)) {
      return res
        .status(400)
        .json({ error: `Movie with id=${id} already exists.` });
    }

    const newMovie = { id, title, year, genre, director };
    movies.push(newMovie);

    return res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ error: "Error adding new movie in memory." });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const movieId = parseInt(req.params.id, 10);
    const movieIndex = movies.findIndex((m) => m.id === movieId);

    if (movieIndex === -1) {
      return res.status(404).json({ error: "Movie not found" });
    }

    const { title, year, genre, director } = req.body;

    if (title !== undefined) movies[movieIndex].title = title;
    if (year !== undefined) movies[movieIndex].year = year;
    if (genre !== undefined) movies[movieIndex].genre = genre;
    if (director !== undefined) movies[movieIndex].director = director;

    return res.json(movies[movieIndex]);
  } catch (error) {
    res.status(500).json({ error: "Error updating the movie in memory." });
  }
});
export default router;
