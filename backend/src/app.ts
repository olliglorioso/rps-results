import express from "express";
import historyRouter from "./controllers/history";
import cors from "cors";
import errorHandler from "./utils/errorHandler";

// The express-server is initialized and a couple of middlewares are applied.
const app = express();

// Cors is used to allow cross-origin requests.
app.use(cors());
app.use(express.json());

app.use("/api/history", historyRouter);
app.use(errorHandler);

export default app;