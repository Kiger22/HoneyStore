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
productRoutes.get("/:id", [isAuth], getProductById);
productRoutes.get("/:nombre", [isAuth], getProductsByName);
productRoutes.get("/:stock", [isAuth], getProductsByStock);
productRoutes.get("/:precio", [isAuth], getProductsByPrice);
productRoutes.get("/:categoria", [isAuth], getProductsByCategory);
productRoutes.post("/", [isAdmin], postProduct);
productRoutes.put("/:id", [isAdmin], putProduct);
productRoutes.delete("/:id", [isAdmin], deleteProduct);

module.exports = productRoutes;