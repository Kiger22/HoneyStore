const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    nombre: { type: String, required: false },
    apellidos: { type: String, required: false },
    email: { type: String, required: false },
    teléfono: { type: String, required: false },
    dirección: { type: String, required: false },
    pais: { type: String, required: false },
    avatar: { type: String, required: false },
    fecha_nacimiento: { type: Date, required: false },
  },
  {
    timestamps: true,
    collection: "users",
  }
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
})

const User = mongoose.model("user", userSchema, "user");
module.exports = User;