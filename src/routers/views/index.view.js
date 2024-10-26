import { Router } from "express";
import ProductsManager from "../../managers/Product.manager.js";
import UsersManager from "../../managers/Users.manager.js";
import CartManager from "../../managers/Cart.manager.js";

const viewsRouter = Router();

viewsRouter.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsManager.read();
    res.render("index", {
      products,
      user: req.session.user || null, 
    });
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/products/admin", async (req, res, next) => {
  try {
    const products = await ProductsManager.read();
    res.render("products/admin", { 
      products,
      user: req.session.user || null,
    });
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

viewsRouter.get("/users/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error logging out" });
    }
    res.redirect("/users/login");
  });
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

viewsRouter.get("/users/profile/:uid", async (req, res, next) => {
  try {
    const user = await UsersManager.readOne(req.params.uid);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.render("users/profile", { user });
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/products/:id", async (req, res, next) => {
  try {
    const product = await ProductsManager.readOne(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
      console.log(error);
    }
    res.render("products/detail", { product });
  } catch (error) {
    next(error);
  }
});

viewsRouter.get("/carts/:uid", async (req, res, next) => {
  try {
    const userId = req.params.uid;
    const carts = await CartManager.getUserCarts(userId);
    res.render("carts/cart", { carts, user: req.session.user });
  } catch (error) {
    next(error);
  }
});


export default viewsRouter;
