const jwt = require("jsonwebtoken");

// Función para generar un token JWT
const generateSign = (id) => {
  // Genera y firma un token con el payload { id } usando la clave secreta JWT almacenada en las variables de entorno.
  // El token tiene una expiración de 30 días ('30d').
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Función para verificar la validez de un token JWT
const verifyJwt = (token) => {
  try {
    // Verifica el token usando la clave secreta almacenada en las variables de entorno.
    // Si el token es válido, devuelve el contenido decodificado del token (el payload, que en este caso incluye { id }).
    return jwt.verify(token, process.env.JWT_SECRET);
  }
  catch (error) {
    // Si el token no es válido (por ejemplo, ha expirado o es incorrecto), lanza un error.
    if (error.name === 'TokenExpiredError') {
      throw new Error("El token ha expirado");
    } else {
      throw new Error("Token inválido");
    }
  }
};


module.exports = { generateSign, verifyJwt };
