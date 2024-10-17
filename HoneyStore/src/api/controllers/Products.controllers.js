const Product = require("../models/Product.model");

// GET 
const getProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al obtener los productos");
  }
};

// GET by ID 
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al obtener el producto con id: " + id);
  }
};

// GET by name
const getProductsByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const products = await Product.findOne({ name });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al obtener los productos con el nombre: " + name);
  }
};

// GET by stock 
const getProductsByStock = async (req, res, next) => {
  try {
    const { stock } = req.params;
    const products = await Product.find({ stock: { $gte: stock } });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Ha ocurrido un error al obtener los productos con stock.");
  }
};

// GET by price
const getProductsByPrice = async (req, res, next) => {
  try {
    const { minPrice, maxPrice } = req.params;
    const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al obtener los productos con precios entre: " + minPrice + " y " + maxPrice);
  }
};

// GET by category
const getProductsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al obtener los productos de la categoría: " + category);
  }
};

// POST  
const postProduct = async (req, res, next) => {
  try {
    // Verificar si ya existe un producto con el mismo nombre
    const existingProduct = await Product.findOne({ name: req.body.name });

    if (existingProduct) {
      return res.status(400).json("Ya existe un producto con este nombre");
    }

    // Si no existe, crea un nuevo producto
    const newProduct = new Product(req.body);
    const productSaved = await newProduct.save();
    return res.status(201).json(productSaved);
  } catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al crear un nuevo producto");
  }
}

// PUT by ID
const putProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json("Algo ha ocurrido un error al actualizar el producto con id: " + id);
  }
}

// DELETE by ID
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    return res.status(200).json(deletedProduct);
  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  getProduct,
  getProductById,
  getProductsByName,
  getProductsByStock,
  getProductsByPrice,
  getProductsByCategory,
  postProduct,
  putProduct,
  deleteProduct
};