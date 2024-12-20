const express = require("express");
const router = express.Router();
const { nekretnine, ponude } = require("../data");

// dohvati sve nekretnine
router.get("/", (req, res) => {
  res.json(nekretnine);
});

//dohvati nekretninu po ID-u
router.get("/:id", (req, res) => {
  const id_nekretnina = req.params.id;

  if (isNaN(id_nekretnina)) {
    return res.status(400).json({ message: "ID mora biti broj." });
  }

  for (let nekretnina of nekretnine) {
    if (id_nekretnina == nekretnina.id) return res.json(nekretnina);
  }
});

// dodaj novu nekretninu
router.post("/", (req, res) => {
  const nova_nekretnina = req.body;
  const potrebni_kljucevi = [
    "id",
    "naziv",
    "opis",
    "cijena",
    "lokacija",
    "br_soba",
    "povrsina",
  ];

  if (!potrebni_kljucevi.every((key) => key in nova_nekretnina)) {
    res
      .status(400)
      .send("Niste poslali sve potrebne podatke za kreiranje nekretnine!");
    return;
  }
  if (isNaN(nova_nekretnina.id)) {
    return res.status(400).send("ID mora biti broj.");
  }
  if (nova_nekretnina.cijena < 0) {
    return res.status(400).send("Cijena ne može biti negativna.");
  }
  if (nova_nekretnina.br_soba < 0) {
    return res.status(400).send("Broj soba ne može biti negativan.");
  }
  if (nova_nekretnina.povrsina <= 0) {
    return res.status(400).send("Površina mora biti veća od nule.");
  }
  nekretnine.push(nova_nekretnina);
  res.send(`Vaša nekretnina je uspješno kreirana!`);
});

// ažuriraj nekretninu potpuno
router.put("/", (req, res) => {
  const id_nekretnina = req.params.id;
  const nova_nekretnina = req.body;

  nova_nekretnina.id = id_nekretnina;

  const potrebni_kljucevi = [
    "id",
    "naziv",
    "opis",
    "cijena",
    "lokacija",
    "br_soba",
    "povrsina",
  ];

  if (!potrebni_kljucevi.every((key) => key in nova_nekretnina)) {
    return res
      .status(400)
      .send("Niste poslali sve potrebne podatke za ažuriranje nekretnine!");
  }

  if (isNaN(nova_nekretnina.id)) {
    return res.status(400).send("ID mora biti broj.");
  }

  if (nova_nekretnina.cijena < 0) {
    return res.status(400).send("Cijena ne može biti negativna.");
  }
  if (nova_nekretnina.br_soba < 0) {
    return res.status(400).send("Broj soba ne može biti negativan.");
  }
  if (nova_nekretnina.povrsina <= 0) {
    return res.status(400).send("Površina mora biti veća od nule.");
  }

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnina
  );

  if (index !== -1) {
    nekretnine[index] = nova_nekretnina;
    res.json(nekretnine[index]);
  } else {
    res.json({ message: "Nekretnina s traženim ID-em ne postoji." });
  }
});

// ažuriraj nekretninu djelomično
router.patch("/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  const nova_nekretnina = req.body;

  if (isNaN(id_nekretnina)) {
    return res.status(400).send("ID mora biti broj.");
  }

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnina
  );

  if (index !== -1) {
    for (const key in nova_nekretnina) {
      nekretnine[index][key] = nova_nekretnina[key];
    }
    res.json(nekretnine[index]);
  } else {
    res.json({ message: "Nekretnina s traženim ID-em ne postoji." });
  }
});

// obriši nekretninu
router.delete("/:id", (req, res) => {
  const id_nekretnina = req.params.id;

  if (isNaN(id_nekretnina)) {
    return res.status(400).json({ message: "ID mora biti broj." });
  }

  const index = nekretnine.findIndex(
    (nekretnina) => nekretnina.id == id_nekretnina
  );

  if (index !== -1) {
    nekretnine.splice(index, 1);
    res.json({ message: "Nekretnina uspješno obrisana." });
  } else {
    res.json({ message: "Nekretnina s traženim ID-em ne postoji." });
  }
});

module.exports = router;
