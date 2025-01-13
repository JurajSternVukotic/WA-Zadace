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

export function validateActorById(getActors) {
  return (req, res, next) => {
    const actorId = parseInt(req.params.id, 10);

    const actors = getActors();
    const actor = actors.find((m) => m.id === actorId);

    if (!actor) {
      return res
        .status(404)
        .json({ error: `Actor with id=${actorId} not found.` });
    }

    req.actor = actor;
    next();
  };
}

export const validateAndSanitizeName = [
  query("name")
    .optional()
    .isString()
    .withMessage("Name must be a valid string.")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name must contain only letters and spaces.")
    .trim()
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateActor = [
  body("name").notEmpty().withMessage("Name is required.").escape(),
  body("birthYear")
    .isInt()
    .withMessage("BirthYear must be an integer.")
    .notEmpty()
    .withMessage("BirthYear is required.")
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
