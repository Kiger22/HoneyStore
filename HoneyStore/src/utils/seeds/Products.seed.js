const mongoose = require("mongoose");
const Product = require("../../api/models/Product.model");
const products = require("../../data/productos");

mongoose
  .connect("mongodb+srv://kiger22:F6jzrqgBMLwoawdZ@cluster0.ixe7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(async () => {
    const allProduct = await Product.find();
    if (allProduct.length) {
      await Product.collection.drop();
      console.log("Productos eliminados correctamente");
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Product.insertMany(products);
    console.log("Productos creados correctamente");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
