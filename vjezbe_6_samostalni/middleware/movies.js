import { body, query, param, validationResult } from "express-validator";

export const validateId = [
  param("id").isInt().withMessage("ID must be an integer."),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export function validateMovieById(getMovies) {
  return (req, res, next) => {
    const movieId = parseInt(req.params.id, 10);

    const movies = getMovies();
    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
      return res
        .status(404)
        .json({ error: `Movie with id=${movieId} not found.` });
    }

    req.movie = movie;
    next();
  };
}

export const validateYearRange = [
  query("min_year")
    .optional()
    .isInt()
    .withMessage("min_year must be an integer.")
    .toInt(),

  query("max_year")
    .optional()
    .isInt()
    .withMessage("max_year must be an integer.")
    .toInt(),

  (req, res, next) => {
    const { min_year, max_year } = req.query;

    if (min_year && max_year && min_year >= max_year) {
      return res.status(400).json({
        errors: [
          {
            msg: "min_year must be less than max_year.",
            param: "min_year, max_year",
            location: "query",
          },
        ],
      });
    }

    next();
  },

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateMovie = [
  body("title").notEmpty().withMessage("Title is required."),
  body("year")
    .isInt()
    .withMessage("Year must be an integer.")
    .notEmpty()
    .withMessage("Year is required."),
  body("genre").notEmpty().withMessage("Genre is required."),
  body("director").notEmpty().withMessage("Director is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
