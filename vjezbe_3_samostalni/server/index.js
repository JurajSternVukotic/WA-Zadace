const express = require("express");
const app = express();

app.use(express.json());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Webshop API");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server dela na http://localhost:${PORT}`);
  }
});

app.get("/proizvodi", (req, res) => {
  res.status(200).json(proizvodi);
});

app.get("/proizvodi/:id", (req, res) => {
  const id_req = req.params.id;
  if (isNaN(id_req)) {
    res.status(400).send("ID mora biti broj");
    return;
  }
  const proizvod = proizvodi.find((proizvod) => proizvod.id == id_req);
  if (proizvod) {
    res.status(200).json(proizvod);
  } else {
    res.status(404).send("Proizvod nije pronađen");
  }
});
app.post("/narudzba", (req, res) => {
  res.send("Napravi novu narudžbu");
});

function Proizvod(id, naziv, cijena, velicine) {
  this.id = id;
  this.naziv = naziv;
  this.cijena = cijena;
  this.velicine = velicine;
}
const proizvodi = [
  new Proizvod(1, "Obična crna majica", 100, ["XS", "S", "M", "L"]),
  new Proizvod(2, "Levi's 501 traperice", 110, ["S", "M", "L"]),
  new Proizvod(3, "Zimska kapa", 40, "onesize"),
  new Proizvod(4, "Čarape Adidas", 20, ["34-36", "37-39", "40-42"]),
  new Proizvod(5, "Tenisice Nike", 200, [
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
  ]),
];
