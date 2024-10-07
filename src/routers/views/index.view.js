import { Router } from "express";
import ProductsManager from "../../managers/Product.manager.js";
import UsersManager from "../../managers/Users.manager.js";

const viewsRouter = Router();

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsManager.read();
    res.render("index", { products });
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/products/admin", async (req, res, next) => {
  try {
    const products = await ProductsManager.read();
    res.render("products/admin", { products });
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/users/register", async (req, res) => {
  res.render("users/register");
});

viewsRouter.get("/users/login", async (req, res) => {
  res.render("users/login");
});

viewsRouter.get("/users/:uid", async (req, res, next) => {
  try {
    const user = await UsersManager.readOne(req.params.uid);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.render("users/profile", { user });
  } catch (error) {
    next(error);
  }
});

export default viewsRouter;
