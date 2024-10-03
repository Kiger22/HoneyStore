const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    nombre: { type: "String", required: true },
    descripcion: { type: "String", required: true },
    productos: [{ type: mongoose.Types.ObjectId, ref: "products", required: false }]
  },
  {
    timestamps: true,
    collection: "nombre de la colección",
  }
);

const Category = mongoose.model("categories", categorySchema, "categories");
module.exports = Category;