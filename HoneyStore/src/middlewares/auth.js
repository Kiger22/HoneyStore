const User = require("../api/models/user.model");
const { verifyJwt } = require("../config/jwt");

// Middleware para verificar si el usuario está autenticado
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json("Token necesario");
    }

    const { id } = verifyJwt(token);
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json("No está autorizado");
    }
    user.password = null; // Se elimina la contraseña por seguridad
    req.user = user;
    next();
  }
  catch (error) {
    return res.status(400).json("Error");
  }
};

// Middleware para verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json("Token necesario");
    }
    const { id } = verifyJwt(token);
    const user = await User.findById(id);
    if (user.rol === "admin") {
      user.password = null; // Se elimina la contraseña por seguridad
      req.user = user;
      next();
    } else {
      return res.status(401).json("No está autorizado para realizar esta acción");
    }
  }
  catch (error) {
    return res.status(500).json("Error");
  }
};

module.exports = {
  isAuth,
  isAdmin,
};