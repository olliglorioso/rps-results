import express from "express";
import historyRouter from "./controllers/history";
import cors from "cors";
import errorHandler from "./utils/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static("build"));
app.use("/api/history", historyRouter);
app.use(errorHandler);

export default app;