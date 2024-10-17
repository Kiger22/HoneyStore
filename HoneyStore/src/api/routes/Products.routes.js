const { isAuth, isAdmin } = require("../../middlewares/Auth");
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
productRoutes.get("/name/:nombre", getProductsByName);
productRoutes.get("/stock/:stock", getProductsByStock);
productRoutes.get("/price/:precio", getProductsByPrice);
productRoutes.get("/category/:categoria", getProductsByCategory);
productRoutes.post("/", [isAuth], postProduct);
productRoutes.put("/:id", [isAdmin], putProduct);
productRoutes.delete("/:id", [isAdmin], deleteProduct);

module.exports = productRoutes;