const User = require("../api/models/user.model");
const { verifyJwt } = require("../config/jwt");

// Middleware para verificar si el usuario está autenticado
const isAuth = async (req, res, next) => {
  try {
    // Extraer el token de los headers
    const token = req.headers.authorization?.split(" ")[1];

    // Verificar si el token fue proporcionado
    if (!token) {
      return res.status(401).json({ mensaje: "Token necesario" });
    }

    const { id } = verifyJwt(token);  // Verificar y decodificar el token
    const user = await User.findById(id);   // Buscar el usuario en la base de datos

    // Si no se encuentra el usuario
    if (!user) {
      return res.status(403).json({ mensaje: "No está autorizado" });
    }
    user.password = undefined;   // Eliminar la contraseña por seguridad
    req.user = user;             // Añadir el usuario a la request
    next();                      // Continuar con la ejecución
  }
  catch (error) {
    return res.status(401).json({ mensaje: "Token inválido o expirado" });
  }
};


// Middleware para verificar si el usuario es administrador
const isAdmin = async (req, res, next) => {
  try {
    // Extraer el token de los headers
    const token = req.headers.authorization?.split(" ")[1];

    // Verificar si el token fue proporcionado
    if (!token) {
      return res.status(401).json({ mensaje: "Token necesario" });
    }

    const { id } = verifyJwt(token);    // Verificar y decodificar el token
    const user = await User.findById(id);    // Buscar el usuario en la base de datos

    // Verificar si el usuario tiene el rol de administrador
    if (user && user.role === "admin") {
      user.password = undefined;    // Eliminar la contraseña por seguridad
      req.user = user;              // Adjuntar el usuario a la request
      next();                       // Continuar al siguiente middleware o controlador
    } else {
      // Si el usuario no es administrador
      return res.status(403).json({ mensaje: "No está autorizado para realizar esta acción" });
    }
  }
  catch (error) {
    return res.status(500).json({ mensaje: "Error del servidor o token inválido" });
  }
};

module.exports = {
  isAuth,
  isAdmin,
};