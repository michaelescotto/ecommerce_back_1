import { Router } from "express";
import productRouter from "./api/products.api.js";
import userRouter from "./api/users.api.js";

const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
