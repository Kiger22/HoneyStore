const Category = require("../models/Category.model");

//GET
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate("productos");
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
    const categories = await Category.findById(id).populate("productos");
    return res.status(200).json(categories);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
};

//GET by Name
const getCategoriesByName = async (req, res, next) => {
  try {
    const { nombre } = req.params;
    const category = await Category.findOne({ nombre }).populate("productos");
    return res.status(200).json(category);
  }
  catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al obtener la Categoria con nombre: " + nombre);
  }
}

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
    const oldCategory = await Category.findById(id).populate("productos");

    if (!oldCategory) {
      return res.status(404).json("Categoría no encontrada");
    }

    // Validar productos existentes
    const existingProducts = await Product.find({ _id: { $in: req.body.products } });

    // Filtrar productos válidos
    const validProductIds = existingProducts.map(product => product._id.toString());

    // Crear un conjunto para evitar duplicados
    const combinedProducts = [new Set([
      ...oldCategory.products.map(product => product.toString()),
      ...validProductIds
    ])];

    // Convertir el conjunto de nuevo a un array
    const updatedProducts = Array.from(combinedProducts);

    const categoryUpdated = await Category.findByIdAndUpdate(
      id,
      { ...req.body, products: updatedProducts },
      { new: true }
    );

    return res.status(200).json(categoryUpdated);
  } catch (error) {
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