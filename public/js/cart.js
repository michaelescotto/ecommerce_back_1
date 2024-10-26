async function deleteCart(cartId) {
  try {
    await fetch(`/api/carts/${cartId}`, {
      method: 'DELETE',
    });
    window.location.reload();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  }
}

async function finalizePurchase() {
  try {
    await fetch(`/api/carts/${userId}/finalize`, {
      method: 'POST',
    });
    alert('Compra finalizada con éxito');
    window.location.href = `/carts/${userId}`;
  } catch (error) {
    console.error('Error al finalizar la compra:', error);
  }
}

async function cancelPurchase() {
  try {
    await fetch(`/api/carts/${userId}/cancel`, {
      method: 'POST',
    });
    alert('Compra cancelada');
    window.location.href = `/carts/${userId}`;
  } catch (error) {
    console.error('Error al cancelar la compra:', error);
  }
}
