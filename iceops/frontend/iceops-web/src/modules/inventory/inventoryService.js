import productService from "../../services/productService";

export const getInventory = () => productService.getAll();

export const setStock = async (productId, quantity) => {
  const response = await productService.getById(productId);
  const product = response.data;

  return productService.update(productId, {
    ...product,
    stock: Number(quantity)
  });
};

export const increaseStock = async (productId, amount) => {
  const response = await productService.getById(productId);
  const product = response.data;

  return productService.update(productId, {
    ...product,
    stock: Number(product.stock) + Number(amount)
  });
};

export const decreaseStock = async (productId, amount) => {
  const response = await productService.getById(productId);
  const product = response.data;

  const newStock = Math.max(
    0,
    Number(product.stock) - Number(amount)
  );

  return productService.update(productId, {
    ...product,
    stock: newStock
  });
};