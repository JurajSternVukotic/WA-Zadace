const express = require("express");
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

// Wrote first entry as example and let AI fill in the rest based on that...
let nekretnine = [
  {
    id: 0,
    naziv: "Vila Veli Jože",
    opis: "Legenda kaže da je nekada davno u ovoj vili živio Veli Jože",
    cijena: 666999,
    lokacija: "Pula",
    br_soba: 6,
    povrsina: 720,
  },
  {
    id: 1,
    naziv: "Dvorac Šašavi Marko",
    opis: "Luksuzni dvorac iz 18. stoljeća s tajnim prolazima i škripavim podovima",
    cijena: 1200000,
    lokacija: "Zagreb",
    br_soba: 12,
    povrsina: 1300,
  },
  {
    id: 2,
    naziv: "Podzemna Kuća Fantazije",
    opis: "Savršeno za one koji žele mir i tamu. Opremljena svime osim prozorima!",
    cijena: 380000,
    lokacija: "Split",
    br_soba: 3,
    povrsina: 150,
  },
  {
    id: 3,
    naziv: "Nebeska Zgrada",
    opis: "Penthouse stan u najvišoj zgradi grada s pogledom na zvijezde (i oblake)",
    cijena: 999999,
    lokacija: "Dubrovnik",
    br_soba: 4,
    povrsina: 200,
  },
  {
    id: 4,
    naziv: "Mistična Koliba",
    opis: "Udaljena u šumi, idealna za vikend bijeg - samo za one hrabre!",
    cijena: 150000,
    lokacija: "Ogulin",
    br_soba: 2,
    povrsina: 80,
  },
  {
    id: 5,
    naziv: "Solarna Villa Eko-Zen",
    opis: "Kuća koja koristi samo obnovljive izvore energije i ima vrt pun lavande",
    cijena: 870000,
    lokacija: "Zadar",
    br_soba: 5,
    povrsina: 300,
  },
  {
    id: 6,
    naziv: "Kuća na Vrh Brijega",
    opis: "Panoramski pogled na sve strane - osjetite se kao kralj brda!",
    cijena: 450000,
    lokacija: "Samobor",
    br_soba: 4,
    povrsina: 220,
  },
  {
    id: 7,
    naziv: "Vodena Kuća",
    opis: "Smještena tik uz rijeku s privatnim molom za ribolov i vožnju čamcem",
    cijena: 790000,
    lokacija: "Karlovac",
    br_soba: 3,
    povrsina: 180,
  },
  {
    id: 8,
    naziv: "Kula Odolijeva",
    opis: "Ova kamena kula s tornjem iz srednjeg vijeka savršena za ljubitelje povijesti",
    cijena: 550000,
    lokacija: "Šibenik",
    br_soba: 5,
    povrsina: 280,
  },
  {
    id: 9,
    naziv: "Svjetionik Sv. Luce",
    opis: "Jedini svjetionik u ponudi s 360° pogledom na more i potpunu privatnost",
    cijena: 990000,
    lokacija: "Hvar",
    br_soba: 3,
    povrsina: 150,
  },
];

// dohvati sve nekretnine
app.get("/pregled", (req, res) => {
  res.json(nekretnine);
});

//dohvati nekretninu po ID-u
app.get("/pregled/:id", (req, res) => {
  const id_nekretnina = req.params.id;
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
    res.send("Niste poslali sve potrebne podatke za kreiranje nekretnine!");
    return;
  }
  nekretnine.push(nova_nekretnina);
  res.send(`Vaša nekretnina je uspješno kreirana!`);
});

// ažuriraj nekretninu potpuno
app.put("/promjeni/:id", (req, res) => {
  const id_nekretnina = req.params.id;
  const nova_nekretnina = req.body;

  nova_nekretnina.id = id_nekretnina;

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

// pošalji novu ponudu
