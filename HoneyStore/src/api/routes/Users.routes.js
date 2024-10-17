const { isAuth, isAdmin } = require("../../middlewares/Auth");
const { getUser, registerUser, loginUser, updateUserRoles, deleteUser } = require("../controllers/Users.controllers");

const usersRoutes = require("express").Router();

usersRoutes.get("/", [isAdmin], getUser);
usersRoutes.post("/register", registerUser);
usersRoutes.post("/login", loginUser);
usersRoutes.put("/user/:id/role", [isAdmin], updateUserRoles); //ruta para poder cambiar el rol de usuario (solo El admin puede hacerlo)
usersRoutes.delete("/user/:id", [isAuth], deleteUser);


module.exports = usersRoutes;