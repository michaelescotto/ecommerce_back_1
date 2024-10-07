import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./src/routers/views/index.view.js";

const server = express();

server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }))
server.use(express.json());
server.use("/api", router);
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
server.use("/", viewsRouter)
server.use(express.static(__dirname + "/public"))

server.use(pathHandler);
server.use(errorHandler);

const port = 8000;
const ready = () => {
  console.log(`server ready on http://localhost:${port}`);
};
server.listen(port, ready);
