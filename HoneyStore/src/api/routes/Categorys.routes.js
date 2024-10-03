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
categoriesRoutes.get("/:id", getCategoriesById):
categoriesRoutes.get("/:nombre", getCategoriesByName);
categoriesRoutes.post("/", postCategories);
categoriesRoutes.put("/:id", putCategories);
categoriesRoutes.delete("/:id", deleteCategories);

module.exports = categoriesRoutes;