import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cartsFilePath = path.join(__dirname, '../data/carts.json');

class Cart {
  constructor() {
    this.carts = [];
  }

  async read() {
    const data = await fs.promises.readFile(cartsFilePath, 'utf-8');
    this.carts = JSON.parse(data);
    return this.carts;
  }

  async write() {
    await fs.promises.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
  }

  async create(cart) {
    const newCart = { ...cart, id: Date.now().toString() };
    this.carts.push(newCart);
    await this.write();
    return newCart;
  }

  async getUserCarts(userId) {
    return this.carts.filter(cart => cart.user_id === userId);
  }

  async delete(id) {
    const index = this.carts.findIndex(cart => cart.id === id);
    if (index !== -1) {
      const deletedCart = this.carts.splice(index, 1);
      await this.write();
      return deletedCart[0];
    }
    return null;
  }

  async update(id, data) {
    const cart = this.carts.find(cart => cart.id === id);
    if (cart) {
      Object.assign(cart, data);
      await this.write();
      return cart;
    }
    return null;
  }
}

export default new Cart();
