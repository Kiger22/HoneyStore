const { isAdmin } = require("../../middlewares/Auth");
const {
  getCategories,
  getCategoriesById,
  getCategoriesByName,
  postCategories,
  putCategories,
  deleteCategories
} = require("../controllers/Categories.controllers");

const categoriesRoutes = require("express").Router();

categoriesRoutes.get("/", getCategories);
categoriesRoutes.get("/:id", getCategoriesById);
categoriesRoutes.get("/:nombre", getCategoriesByName);
categoriesRoutes.post("/", [isAdmin], postCategories);
categoriesRoutes.put("/:id", [isAdmin], putCategories);
categoriesRoutes.delete("/:id", [isAdmin], deleteCategories);

module.exports = categoriesRoutes;