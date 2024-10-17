const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    nombre: { type: "string", required: true },
    descripcion: { type: "string", required: false },
    precio: { type: "number", required: true },
    stock: { type: "number", required: true },
    categoria: { type: mongoose.Types.ObjectId, ref: "categories", required: false },
    peso: { type: "string", required: true },
    imagen: { type: "string", required: true },
    fecha_expiracion: { type: "string", required: true },
  },
  {
    timestamps: true,
    collection: "products",
  }
);

const Product = mongoose.model("products", productSchema, "products");
module.exports = Product;