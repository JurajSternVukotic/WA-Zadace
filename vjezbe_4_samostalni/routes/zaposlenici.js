import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Zaposlenici" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Zaposlenici:id" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Zaposlenici" });
});

export default router;
