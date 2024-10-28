const express = require("express");
const app = express();

const users = [
  { id: 0, ime: "Juraj", prezime: "Stern-Vukotic" },
  { id: 1, ime: "Rajju", prezime: "Ticokuv" },
  { id: 2, ime: "Jaruj", prezime: "Ernst" },
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
