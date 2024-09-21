import {Router} from "express"
import productController from "../controllers/product.controller.js"

const router = Router()


router.post("/", productController.createProduct)
router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.put("/:id", productController.updateProduct)
router.delete("/:id", productController.deleteProduct)

export default router