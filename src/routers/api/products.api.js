import { Router } from "express";
import productController from "../../controllers/product.controller.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    await productController.createProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    await productController.getAllProducts(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    await productController.getProductById(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    await productController.updateProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await productController.deleteProduct(req, res);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
