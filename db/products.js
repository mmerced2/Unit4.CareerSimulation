const prisma = require("./index");

const createProduct = (productData) => {
  return prisma.products.create({
    data: productData,
  });
};

const getAllProducts = (user_id) => {
  return prisma.products.findMany({
    where: { user_id },
  });
};

const getProductById = (id) => {
  return prisma.products.findUnique({
    where: { product_id: id },
  });
};

const updateProducts = (id, productData) => {
  return prisma.products.update({
    where: { product_id: id },
    data: productData,
  });
};

const deleteProduct = async (id) => {
  const product = await getProductById(id);
  if (product) {
    return prisma.products.delete({
      where: { product_id: id },
    });
  }
  return;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
  deleteProduct,
};