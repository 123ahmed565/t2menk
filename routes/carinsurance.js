const express = require("express");
const Router = express.Router();


const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cbfn) => {
    cbfn(null, `./assets/uploads/profilePics`);
  },
  filename: (req, file, cbfn) => {
    cbfn(
      null,
      "" +
        Date.now() +
        parseInt(Math.random() * 100000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5Mb
  },
});

const {
    getAllCars,
    getCar,
    createCar,
    updateCar,
    deleteCar,
} = require("../controllers/carinsurance-controller");


Router.route("/")
  .get(getAllCars)
  .post( upload.fields([{
    name: 'faceImg', maxCount: 1
  }, {
    name: 'backImg', maxCount: 1
  }]),createCar);




Router.route("/:id")
  .get(getCar)
  .put(upload.single("faceImg"),upload.single("backImg"),updateCar)
  .delete(deleteCar);
module.exports = Router;
