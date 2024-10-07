import { Router } from "express";
import productRouter from "./api/products.api.js";
import userRouter from "./api/users.api.js";
import viewsRouter from "./views/index.view.js";

const router = Router();

router.use("/", viewsRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);


export default router;
