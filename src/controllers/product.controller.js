import ProductsManager from "../managers/Product.manager.js"

const createProduct = (req, res) => {
    const {title, photo, category, price, stock } = req.body

    if (!title) {
        return res.status(400).json({error: "Title is required"})
    }
    const product = {
        title,
        photo: photo || "no-photo.png",
        category: category || "default",
        price: price || 1,
        stock: stock || 1,
    }

    ProductsManager.create(product);
    res.status(201).json({ id: product.id, message: "Product created successfully"})

}


const getAllProducts = (req, res) => {
    const products = ProductsManager.read()
    res.status(200).json({products})
}


const getProductById = (req, res) => {
    const {id} = req.params;
    const product = ProductsManager.readOne(id)

    if (!product) {
        return res.status(404).json({error:"Product not found"})
    }
    res.status(200).json(product)
}


const updateProduct = (req, res) => {
    const {id} = req.params
    const updatedProduct = ProductsManager.update(id, req.body)

    if (!updatedProduct) {       
        return res.status(404).json({error:"Product not found"})
    }
    res.status(200).json({updatedProduct, message: "Product updated successfully"})
}


const deleteProduct = (req, res) => {
    const {id} = req.params
    const deletedProduct = ProductsManager.delete(id)

    if (!deletedProduct) {
        return res.status(404).json({error:"Product not found"})
    }
    res.status(200).json({deletedProduct, message: "Product deleted"})
}

export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}