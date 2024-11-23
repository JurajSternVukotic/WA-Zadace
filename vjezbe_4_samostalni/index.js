import express from "express";
const app = express();
app.use(express.json());
const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server dela na http://localhost:${PORT}`);
  }
});

import zaposleniciRouter from "./routes/zaposlenici.js";
app.use("/zaposlenici", zaposleniciRouter);
