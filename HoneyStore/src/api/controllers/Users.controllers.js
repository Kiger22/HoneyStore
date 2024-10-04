const { generateSign } = require("../../config/jwt");
const User = require("../models/user.model")

const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Error");
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role || "user"
    });

    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(400).json({ message: "Este usuario ya existe" });
    }

    const userSaved = await newUser.save();
    return res.status(201).json(userSaved);
  }
  catch (error) {
    return res.status(400).json("Error");
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json("Este usuario no existe");
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id);
      return res.status(200).json({ user, token });
    } else {
      return res.status(401).json("Contraseña incorrecta");
    }
  }
  catch (error) {
    return res.status(500).json("Error");
  }
};

module.exports = {
  getUser,
  registerUser,
  loginUser,
};