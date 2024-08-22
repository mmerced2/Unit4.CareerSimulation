const prisma = require("./index");

const createProduct = (productData) => {
  return prisma.products.create({
    data: productData,
  });
};

const getAllProducts = async () => {
  return prisma.products.findMany({
   orderBy: {
    product_type: "asc",
   }
  });
  return products;
};

const getProductById = async (product_id) => {
  return prisma.products.findUnique({
    where: { id : product_id },
  });
};

const updateProducts = async (product_id, productData) => {
  return prisma.products.update({
    where: {  id: product_id },
    data: productData,
  });
};

const deleteProduct = async (product_id) => {
  const product = await getProductById(id);
  if (product) {
    return prisma.products.delete({
      where: {  id : product_id },
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