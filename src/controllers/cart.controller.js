import Cart from '../managers/Cart.manager.js';

class CartsManager {
  async create(cart) {
    return await Cart.create(cart);
  }

  async read() {
    return await Cart.read();
  }

  async getUserCarts(userId) {
    return await Cart.getUserCarts(userId);
  }

  async delete(id) {
    return await Cart.delete(id);
  }

  async update(id, data) {
    return await Cart.update(id, data);
  }

  async addProductToCart(userId, productId, quantity) {
    const userCarts = await Cart.getUserCarts(userId);
    let userCart = userCarts[0] || await Cart.create({ user_id: userId, products: [] });
    
    const productInCart = userCart.products.find(p => p.product_id === productId);
    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      userCart.products.push({ product_id: productId, quantity });
    }
  
    await Cart.update(userCart.id, userCart);
    return userCart;
  }
}

export default new CartsManager();
