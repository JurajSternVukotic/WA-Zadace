import express from "express";
const app = express();
app.use(express.json());
let PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Poslužitelj dela na http://localhost:${PORT}`);
  }
});

let korisnici = [
  { id: 983498354, ime: "Ana", prezime: "Anić", email: "aanic@gmail.com" },
  { id: 983498355, ime: "Ivan", prezime: "Ivić", email: "iivic@gmail.com" },
  {
    id: 983498356,
    ime: "Sanja",
    prezime: "Sanjić",
    email: "ssanjic123@gmail.com",
  },
];

app.get("/korisnici", async (req, res) => {
  if (korisnici) {
    return res.status(200).json(korisnici);
  }
  return res.status(404).json({ message: "Nema korisnika" });
});

app.get("/korisnici/:id", async (req, res) => {
  const id_route_param = parseInt(req.params.id);
  const korisnik = korisnici.find((korisnik) => korisnik.id === id_route_param);
  if (korisnik) {
    return res.status(200).json(korisnik);
  }
  return res.status(404).json({ message: "Korisnik nije pronađen" });
});

const validacijaEmaila = (req, res, next) => {
  console.log("Middleware: validacijaEmaila");
  if (req.body.email && typeof req.body.email === "string") {
    return next();
  } else {
    return res
      .status(400)
      .json({ message: "Neispravna struktura tijela zahtjeva" });
  }
};
const pretragaKorisnika = (req, res, next) => {
  console.log("Middleware: pretragaKorisnika");
  const id_route_param = parseInt(req.params.id);
  const korisnik = korisnici.find((korisnik) => korisnik.id === id_route_param);
  if (korisnik) {
    req.korisnik = korisnik;
    return next();
  } else {
    return res.status(404).json({ message: "Korisnik nije pronađen" });
  }
};

app.patch(
  "/korisnici/:id",
  [pretragaKorisnika, validacijaEmaila],
  async (req, res) => {
    req.korisnik.email = req.body.email;
    console.log(korisnici);
    return res.status(200).json(req.korisnik);
  }
);
