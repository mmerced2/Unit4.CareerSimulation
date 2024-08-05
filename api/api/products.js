const express = require("express");
const productsRouter = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProducts,
  deleteProduct,
} = require("../../db/products");
const { checkProductData } = require("./products_utils");

// GET /api/products
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts(req.user.user_id);

    res.send({ products });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//POST /api/products
productsRouter.post("/", checkProductData, async (req, res, next) => {
  try {
    const product = await createProduct({ ...req.body, user_id: req.user.user_id });

    res.send({ product });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET /api/products/:id
productsRouter.get("/:id", async (req, res, next) => {
  try {
    const product = await getProductById(parseInt(req.params.id));

    res.send({ product });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// PUT /api/products/:id
productsRouter.put("/:id", async (req, res, next) => {
  try {
    //makes sure to pull out only the columns for our product from the req.body
    const { name,description,product_type, img_url,} = req.body;
    const product = await updateProducts(parseInt(req.params.id), {
      name,
      description,
      product_type, 
      img_url,
    });

    res.send({ product });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE /api/products/:id
productsRouter.delete("/:id", async (req, res, next) => {
  try {
    const product = await deleteProduct(parseInt(req.params.id));

    res.send({ product });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;