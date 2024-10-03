const mongoose = require("mongoose");
const Category = require("../../api/models/Category.model");
const categories = require("../../data/categorias");

mongoose
  .connect("mongodb+srv://kiger22:F6jzrqgBMLwoawdZ@cluster0.ixe7r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(async () => {
    const allCategory = await Category.find();
    if (allCategory.length) {
      await Category.collection.drop();
      console.log("Categorias eliminadas correctamente");
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await Category.insertMany(categories);
    console.log("Categorias creadas correctamente");
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  .finally(() => mongoose.disconnect());
