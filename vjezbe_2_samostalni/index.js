const express = require("express");
//const nekretnineRoutes = require("./routes/nekretnine");
const ponudeRoutes = require("./routes/ponude");
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});

//app.use("/nekretnine", nekretnineRoutes);
app.use("/ponude", ponudeRoutes);

// dohvati sve nekretnine
app.get("/pregled", (req, res) => {
  res.json(nekretnine);
});

//dohvati nekretninu po ID-u
app.get("/pregled/:id", (req, res) => {
  const id_nekretnina = req.params.id;

  if (isNaN(id_nekretnina)) {
    return res.status(400).json({ message: "ID mora biti broj." });
  }

  for (let nekretnina of nekretnine) {
    if (id_nekretnina == nekretnina.id) return res.json(nekretnina);
  }
});

// dodaj novu nekretninu
app.post("/dodaj", (req, res) => {
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
app.put("/promjeni/:id", (req, res) => {
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
app.patch("/promjeni/:id", (req, res) => {
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
app.delete("/obrisi/:id", (req, res) => {
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
