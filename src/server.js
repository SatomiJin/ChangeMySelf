import express from "express";
import initRoutes from "./routes/index.js";
import bodyParser from "body-parser";
import Cors from "cors";
import * as connectDB from "./config/connectDB.js";
const app = express();
const port = 3000;

app.use(express.json());
app.use(Cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

initRoutes(app);
connectDB.connectDB();
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
