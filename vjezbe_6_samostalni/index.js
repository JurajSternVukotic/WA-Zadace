// index.js
import express from "express";
import korisniciRouter from "./routes/korisnici.js";
const app = express();

app.use(express.json());
app.use("/korisnici", korisniciRouter);

let PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Poslužitelj dela na http://localhost:${PORT}`);
  }
});
