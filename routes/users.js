const express = require("express");
const Router = express.Router();




const {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/user-controller");


Router.route("/")
  .get(getAllUsers)
  .post(createUser);




Router.route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);
module.exports = Router;
