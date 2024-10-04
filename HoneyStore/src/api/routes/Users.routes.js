const { isAuth } = require("../../middlewares/Auth");
const { getUser, registerUser, loginUser } = require("../controllers/Users.controllers");

const usersRoutes = require("express").Router();

usersRoutes.get("/", [isAuth], getUser);
usersRoutes.post("/register", registerUser);
usersRoutes.post("/login", loginUser);

module.exports = usersRoutes;