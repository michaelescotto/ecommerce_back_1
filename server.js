import express from "express"
import morgan from "morgan"
import router from "./src/routers/index.router.js"
import pathHandler from "./src/middlewares/pathHandler.mid.js"


const server = express()

server.use(morgan("dev"))
server.use(express.json())
server.use("/api/products", router)
server.use(pathHandler)
server.use(errorHandler)

const port = 8000
const ready = () => {console.log(`server ready on http://localhost:${port}`);}
server.listen(port, ready)