const express = require("express");
const app = express();

const users = [
  { id: 0, ime: "Juraj", prezime: "Stern-Vukotic" },
  { id: 1, ime: "Rajju", prezime: "Ticokuv" },
  { id: 2, ime: "Jaruj", prezime: "Ernst" },
];

const pizze = [
  {id: 0, naziv: 'Margerita', cijena: 7},
  {id: 1, naziv: 'Capricosa', cijena: 10},
  {id: 2, naziv: 'Quattro Formaggi', cijena: 11},
  {id: 3, naziv: 'Tartufata', cijena: 13},
];

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/pizza", (req, res) => {
res.json(pizze);
});

app.get("/pizza/:id", (req, res) => {
  let id_pizza = req.params.id;
  for (let pizza of pizze){
    if (id_pizza == pizza.id)
      return res.json(pizza);
  }
  });