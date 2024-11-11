const express = require("express");
const router = express.Router();
const { nekretnine, ponude } = require("../data");

// pošalji novu ponudu
router.post("/", (req, res) => {
  const nova_ponuda = req.body;
  const potrebni_kljucevi = [
    "id",
    "id_nekretnine",
    "ime",
    "prezime",
    "ponuda",
    "tel",
  ];

  if (!potrebni_kljucevi.every((key) => key in nova_ponuda)) {
    res
      .status(400)
      .send("Niste poslali sve potrebne podatke za kreiranje ponude!");
    return;
  }

  if (isNaN(nova_ponuda.id) || isNaN(nova_ponuda.id_nekretnine)) {
    return res.status(400).send("ID i ID nekretnine moraju biti brojevi.");
  }

  if (
    !nekretnine.some((nekretnina) => nekretnina.id == nova_ponuda.id_nekretnine)
  ) {
    return res.status(404).send("Nekretnina s traženim ID-em ne postoji.");
  }

  if (nova_ponuda.ponuda < 0) {
    return res.status(400).send("Ponuda ne može biti negativna.");
  }

  ponude.push(nova_ponuda);
  res.send("Vaša ponuda je uspješno kreirana!");
});

module.exports = router;
