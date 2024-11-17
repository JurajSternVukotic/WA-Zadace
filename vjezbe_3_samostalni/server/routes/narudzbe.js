// server/routes/narudzbe.js

import express from "express";
import { Narudzba, narudzbe, proizvodi } from "../data.js";

const router = express.Router();

router.post("/", (req, res) => {
  const podaci = req.body;
  const { naruceni_proizvodi } = podaci;

  if (!Array.isArray(naruceni_proizvodi) || naruceni_proizvodi.length === 0) {
    return res.status(400).json({ message: "Nema podataka" });
  }

  const latest_id = narudzbe.length ? narudzbe.at(-1).id + 1 : 1;

  const narudzba_obj = new Narudzba(latest_id, naruceni_proizvodi);

  narudzbe.push(narudzba_obj);

  res.status(201).json({
    id: narudzba_obj.id,
    naruceni_proizvodi: narudzba_obj.naruceni_proizvodi,
    ukupnaCijena: narudzba_obj.ukupnaCijena,
  });
});

export default router;
