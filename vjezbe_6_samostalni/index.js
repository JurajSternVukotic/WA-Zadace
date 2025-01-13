// index.js
import express from "express";
import korisniciRouter from "./routes/korisnici.js";
const app = express();

app.use(express.json());
const timer = (req, res, next) => {
  console.log(`Trenutno vrijeme: ${new Date().toLocaleString()}`);
  next();
};
const requestLogger = (req, res, next) => {
  const date = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;
  console.log(`[${date}] : ${method} ${url}`);
  next();
};

const adminLogger = (req, res, next) => {
  console.log("Oprez! Pristigao zahtjev na /admin rutu");
  next();
};

const errorHandler = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: "Greška na poslužitelju" });
};

app.use(errorHandler);
app.use(requestLogger);
app.use(timer);
app.use("/korisnici", korisniciRouter);
app.all("/admin", adminLogger);
korisniciRouter.all("/admin", adminLogger);

let PORT = 3000;

app.get("/error", (req, res) => {
  throw new Error("Simulirana greška na poslužitelju");
});

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Poslužitelj dela na http://localhost:${PORT}`);
  }
});
