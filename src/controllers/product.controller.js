import ProductsManager from "../managers/Product.manager.js";

const createProduct = async (req, res) => {
  const { title, photo, category, price, stock } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const product = {
    title,
    photo: photo || "no-photo.png",
    category: category || "default",
    price: price || 1,
    stock: stock || 1,
  };

  try {
    await ProductsManager.create(product);
    res
      .status(201)
      .json({ id: product.id, message: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error creating product" });
  }
};

const getAllProducts = async (req, res) => {
  const { category } = req.query;

  try {
    let products = await ProductsManager.read();

    if (category) {
      products = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (category && products.length === 0) {
      return res
        .status(404)
        .json({ error: `No products found for category: ${category}` });
    }

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductsManager.readOne(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedProduct = await ProductsManager.update(id, req.body);

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res
      .status(200)
      .json({ updatedProduct, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await ProductsManager.delete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ deletedProduct, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};

export default {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
