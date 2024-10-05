const Category = require("../models/Category.model");

//GET
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
};

//GET by ID
const getCategoriesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categories = await Category.findById(id).populate("products");
    return res.status(200).json(categories);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
};

//GET by Name
const getCategoriesByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const categories = await Category.findOne({ name }).populate("products");
    return res.status(200).json(categories);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
};

//POST
const postCategories = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    const categorySaved = await newCategory.save();
    return res.status(201).json(categorySaved);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
}

// PUT 
const putCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldCategory = await Category.findById(id);
    const newCategory = new Category(req.body);
    newCategory._id = id;
    newCategory.products = [...oldCategory, ...req.body.products];
    const categoryUpdated = await Category.findByIdAndUpdate(id, newCategory, { new: true });
    return res.status(200).json(categoryUpdated);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
};

// DELETE
const deleteCategories = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndDelete(id);
    return res.status(200).json(categoryDeleted);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
}

module.exports = {
  getCategories,
  getCategoriesById,
  getCategoriesByName,
  postCategories,
  putCategories,
  deleteCategories,
};