import express from "express";
import logger from "./middleware/logger.js";
import moviesRouter from "./routes/movies.js";
import actorsRouter from "./routes/actors.js";

const app = express();
app.use(express.json());
app.use(logger("vjezbe_6_samostalni"));
const PORT = 3000;

app.listen(PORT, (error) => {
  if (error) {
    console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
  } else {
    console.log(`Server dela na http://localhost:${PORT}`);
  }
});

app.use("/movies", moviesRouter);
app.use("/actors", actorsRouter);
