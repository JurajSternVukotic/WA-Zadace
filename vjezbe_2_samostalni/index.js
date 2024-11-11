const express = require("express");
const nekretnineRoutes = require("./routes/nekretnine");
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

app.use("/nekretnine", nekretnineRoutes);
app.use("/ponude", ponudeRoutes);
