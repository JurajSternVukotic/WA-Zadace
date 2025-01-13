import express from "express";
const router = express.Router();
import fs from "fs/promises";
import path from "path";
import {
  validateMovieById,
  validateId,
  validateYearRange,
  validateMovie,
} from "../middleware/movies.js";

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
const getMovies = () => movies;

router.get("/", validateYearRange, (req, res) => {
  const { min_year, max_year } = req.query;

  let filteredMovies = movies;

  if (min_year !== undefined) {
    filteredMovies = filteredMovies.filter((movie) => movie.year >= min_year);
  }

  if (max_year !== undefined) {
    filteredMovies = filteredMovies.filter((movie) => movie.year <= max_year);
  }

  res.json(filteredMovies);
});

router.get("/:id", validateId, validateMovieById(getMovies), (req, res) => {
  res.json(req.movie);
});

router.post("/", validateMovie, (req, res) => {
  try {
    const { id, title, year, genre, director } = req.body;

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

router.patch("/:id", validateMovie, (req, res) => {
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
