const express = require("express");
const app = express();

const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server je pokrenut na http://localhost:${PORT}`);
  }
});

app.get("/", (req, res) => {
  res.send("<h1>Hello Express!</h1>");
});

app.get("/about", (req, res) => {
  res.send("<h1>Ovo je stranica o nama!</h1>");
});
