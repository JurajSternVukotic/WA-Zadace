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

const validateZaposlenik = (zaposlenik) => {
  const { ime, prezime, godine_staža, pozicija } = zaposlenik;
  if (
    typeof ime !== "string" ||
    ime.trim() === "" ||
    typeof prezime !== "string" ||
    prezime.trim() === "" ||
    typeof godine_staža !== "number" ||
    !Number.isInteger(godine_staža) ||
    godine_staža < 0 ||
    typeof pozicija !== "string" ||
    pozicija.trim() === ""
  ) {
    return false;
  }

  return true;
};

router.get("/", async (req, res) => {
  try {
    const zaposlenici = await readZaposlenici();
    res.status(200).json(zaposlenici);
  } catch (error) {
    res.status(500).json({ message: "Greška prilikom dohvata zaposlenika." });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const zaposlenici = await readZaposlenici();
    const zaposlenik = zaposlenici.find((z) => z.id === id);
    if (zaposlenik) {
      res.status(200).json(zaposlenik);
    } else {
      res.status(404).json({ message: "Zaposlenik nije pronađen." });
    }
  } catch (error) {
    res.status(500).json({ message: "Greška prilikom dohvata zaposlenika." });
  }
});

router.post("/", async (req, res) => {
  const { ime, prezime, godine_staža, pozicija } = req.body;

  if (
    ime === undefined ||
    prezime === undefined ||
    godine_staža === undefined ||
    pozicija === undefined
  ) {
    return res.status(400).json({ message: "Fale podaci." });
  }

  const noviZaposlenik = { ime, prezime, godine_staža, pozicija };

  if (!validateZaposlenik(noviZaposlenik)) {
    return res.status(400).json({ message: "Nisu dobri tipovi podataka." });
  }

  try {
    const zaposlenici = await readZaposlenici();

    const newId =
      zaposlenici.length > 0
        ? Math.max(...zaposlenici.map((z) => z.id)) + 1
        : 1;

    const zaposlenikWithId = { id: newId, ...noviZaposlenik };

    zaposlenici.push(zaposlenikWithId);

    await writeZaposlenici(zaposlenici);

    res.status(201).json(zaposlenikWithId);
  } catch (error) {
    res.status(500).json({ message: "Greška pri dodavanju zaposlenika." });
  }
});

export default router;
