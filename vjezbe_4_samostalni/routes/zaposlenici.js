import express from "express";
import { promises as fs } from "fs";
import path from "path";

const router = express.Router();
const dataPath = path.join(process.cwd(), "data", "zaposlenici.json");

const readZaposlenici = async () => {
  const data = await fs.readFile(dataPath, "utf-8");
  return JSON.parse(data);
};

const writeZaposlenici = async (data) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
};

router.get("/", async (req, res) => {
  try {
    const zaposlenici = await readZaposlenici();
    res.status(200).json(zaposlenici);
  } catch (error) {
    res.status(500).json({ message: "Greška prilikom dohvata zaposlenika." });
  }
});

router.get("/:id", (req, res) => {
  res.status(200).json({ message: "Zaposlenici:id" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "Zaposlenici" });
});

export default router;
