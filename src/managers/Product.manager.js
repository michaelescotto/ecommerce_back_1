import fs from "fs/promises";
import generateId from "../utils/generateId.js";

const path = "./src/data/products.json";

class ProductsManager {
  constructor() {
    this.path = path;
  }

  async read() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      if (error.code === "ENOENT") {
        return [];
      }
      throw error;
    }
  }

  async readOne(id) {
    const products = await this.read();
    return products.find((product) => product.id === id);
  }

  async create(product) {
    product.id = generateId();
    const products = await this.read();
    products.push(product);
    await this.save(products);
  }

  async update(id, data) {
    const products = await this.read();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...data };
    await this.save(products);
    return products[index];
  }

  async delete(id) {
    const products = await this.read();
    const index = products.findIndex((product) => product.id === id);
    if (index === -1) return null;

    const [deletedProduct] = products.splice(index, 1);
    await this.save(products);
    return deletedProduct;
  }

  async save(products) {
    try {
      await fs.writeFile(this.path, JSON.stringify(products, null, 2), "utf-8");
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductsManager();
