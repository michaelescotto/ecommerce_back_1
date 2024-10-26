import { Router } from "express";
import productRouter from "./api/products.api.js";
import userRouter from "./api/users.api.js";
import cartRouter from "./api/carts.api.js";
import viewsRouter from "./views/index.view.js";

const router = Router();

router.use("/", viewsRouter);
router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/carts", cartRouter);


export default router;
