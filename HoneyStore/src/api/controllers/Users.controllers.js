const { generateSign } = require("../../config/jwt");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

//Consultar usuarios (Básico)
const getUser = async (req, res, next) => {
  try {
    const user = await User.find();
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("Error");
  }
};

//Registrar un nuevo usuario
const registerUser = async (req, res, next) => {
  try {
    // Crear un nuevo User con los datos recibidos
    const newUser = new User({
      username: req.body.username,
      password: req.body.password, // Contraseña proporcionada (será hasheada más adelante)
      role: req.body.role || "user" // Rol del usuario, por defecto es "user" si no se proporciona
    });

    // Buscar si el usuario ya existe en la base de datos usando el nombre de usuario
    const existingUser = await User.findOne({ username: req.body.username });

    // Si el usuario ya existe, devuelve un mensaje de error
    if (existingUser) {
      return res.status(400).json({ message: "Este usuario ya existe" });
    }

    // Guardar el nuevo usuario en la base de datos
    const userSaved = await newUser.save();

    // Devolver una respuesta exitosa con el nuevo usuario guardado
    return res.status(201).json(userSaved);
  }
  catch (error) {
    return res.status(400).json("Error : " + error.message);
  }
};


//Actualizar un usuario
const loginUser = async (req, res, next) => {
  try {
    //Buscar el usuario en la base de datos por nombre de usuario
    const user = await User.findOne({ username: req.body.username });

    //Si el usuario no existe en la base de datos, devuelve mensaje de error
    if (!user) {
      return res.status(401).json({ message: "Este usuario no existe" });
    }

    // Compara la contraseña ingresada por el usuario con la contraseña almacenada en la base de datos
    const passwordMatch = bcrypt.compareSync(req.body.password, user.password);

    // Si las contraseñas coinciden
    if (passwordMatch) {
      // Generar un token de autenticación usando el ID del usuario
      const token = generateSign(user._id);

      // Mostrar en la consola el objeto usuario y el token generado
      console.log({ user, token });

      // Devolver una respuesta exitosa con los datos del usuario y el token de autenticación
      return res.status(200).json({ user, token });
    }
    // Si las contraseñas no coinciden
    else {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  }
  catch (error) {
    return res.status(500).json({ message: "Ocurrió un error inesperado. Inténtalo nuevamente más tarde." });
  }
};

// Función para actualizar los roles de un usuario existente
const updateUserRoles = async (req, res) => {

  try {
    // Obtener el ID del usuario 
    const { id } = req.params;

    // Buscar el usuario por su ID en la base de datos
    const userToUpdate = await User.findById(id);

    // Si el usuario no se encuentra, devolver un mensaje de error
    if (!userToUpdate) {
      return res.status(404).json("Usuario no encontrado");
    }

    // Actualizar el rol del usuario con el valor proporcionado en la solicitud 
    userToUpdate.role = req.body.role;

    // Guardar los cambios en la base de datos
    await userToUpdate.save();

    // Devolver una respuesta exitosa con el usuario actualizado
    return res.status(200).json(userToUpdate);
  }
  catch (error) {
    return res.status(500).json("Error");
  }
};


// Función para eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    // Obtener el ID del usuario a eliminar 
    const { id } = req.params;

    // Verificar si el usuario que hace la solicitud tiene permisos para eliminar 
    // Debe ser "admin" o el mismo usuario
    if (req.user.role === "admin" || req.user._id.toString() === id) {

      // Buscar y eliminar al usuario por su ID
      const userToDelete = await User.findByIdAndDelete(id);

      // Verificar si el usuario a eliminar existe
      if (!userToDelete) {
        return res.status(404).json("Usuario no encontrado");
      }

      // Devolver un mensaje de éxito si el usuario fue eliminado correctamente
      return res.status(200).json("Usuario eliminado correctamente");
    } else {
      return res.status(403).json("No tienes permisos para eliminar este usuario");
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
  updateUserRoles,
  deleteUser,
}