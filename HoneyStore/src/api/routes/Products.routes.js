const {
  getProduct,
  getProductById,
  getProductsByName,
  getProductsByStock,
  getProductsByCategory,
  postProduct,
  putProduct,
  deleteProduct,
  getProductsByPrice
} = require("../controllers/Products.controllers");


const productRoutes = require("express").Router();

productRoutes.get("/", getProduct);
productRoutes.get("/:id", getProductById);
productRoutes.get("/:nombre", getProductsByName);
productRoutes.get("/:stock", getProductsByStock);
productRoutes.get("/:precio", getProductsByPrice);
productRoutes.get("/:categoria", getProductsByCategory);
productRoutes.post("/", postProduct);
productRoutes.put("/:id", putProduct);
productRoutes.delete("/:id", deleteProduct);

module.exports = productRoutes;