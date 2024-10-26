import { Router } from 'express';
import CartsManager from '../../controllers/cart.controller.js';

const cartRouter = Router();

cartRouter.post('/', async (req, res) => {
  const { user_id, product_id, quantity, state } = req.body;
  if (!user_id || !product_id || !quantity || !state) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }
  const newCart = await CartsManager.create({ user_id, product_id, quantity, state });
  res.status(201).json(newCart);
});

cartRouter.get('/:uid', async (req, res) => {
  const userId = req.params.uid;
  const carts = await CartsManager.getUserCarts(userId);
  res.status(200).json(carts);
});

cartRouter.post('/:uid/add-product', async (req, res) => {
  const { product_id, quantity } = req.body;
  const userId = req.params.uid;
  if (!product_id || !quantity) {
    return res.status(400).json({ error: 'Producto o cantidad no especificados.' });
  }
  try {
    const updatedCart = await CartsManager.addProductToCart(userId, product_id, quantity);
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

cartRouter.delete('/:cartId', async (req, res) => {
  const deletedCart = await CartsManager.delete(req.params.cartId);
  if (!deletedCart) return res.status(404).json({ error: 'Carrito no encontrado.' });
  res.status(200).json(deletedCart);
});

cartRouter.put('/:cartId', async (req, res) => {
  const updatedCart = await CartsManager.update(req.params.cartId, req.body);
  if (!updatedCart) return res.status(404).json({ error: 'Carrito no encontrado.' });
  res.status(200).json(updatedCart);
});


cartRouter.post('/:cartId/finalize', async (req, res) => {
    try {
      const cart = await CartManager.finalize(req.params.cartId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al finalizar la compra' });
    }
  });
  
  cartRouter.post('/:cartId/cancel', async (req, res) => {
    try {
      const cart = await CartManager.cancel(req.params.cartId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ error: 'Error al cancelar la compra' });
    }
  });

export default cartRouter;
