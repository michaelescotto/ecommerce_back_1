import "dotenv/config.js"
import express from "express";
import morgan from "morgan";
import router from "./src/routers/index.router.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import { engine } from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./src/routers/views/index.view.js";
import session from "express-session";
import dbConnect from "./src/utils/dbConnect.util.js";

const server = express();


server.use(session({
  secret: 'admin1234',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));
server.use(morgan("dev"));
server.use(express.urlencoded({ extended: true }))
server.use(express.json());

server.use("/", viewsRouter)
server.use("/api", router);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");
server.use(express.static(__dirname + "/public"))
server.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


server.use(errorHandler);
server.use(pathHandler);

const port = process.env.PORT || 8000
const ready = () => {
  console.log(`server ready on http://localhost:${port}`);
  dbConnect()
};
server.listen(port, ready);
