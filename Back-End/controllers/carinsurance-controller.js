const APIFearures = require("../utils/APIFeatures");
const {Car} = require('../models/carinsurance');

const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

const getAllCars = catchAsyncError(async (req, res, next) => {
  const features = new APIFearures(Car.find(), req.query)
    .filter()
    .sort()
    .project()
    .paginate();

  const lengthFeatures = new APIFearures(Car.find(), req.query).filter();

  const cars = await features.query;
  const countQuery = await lengthFeatures.query;

  // Send response
  res.status(200).json({
    status: "success",
    count: cars.length,
    totalCount: countQuery.length,
    carsList: cars,
  });
});

// get req by id
const getCar = catchAsyncError(async (req, res, next) => {
  let car = await Car.findOne({ _id: req.params.id });
  if (!car) {
    return next(new ErrorHandler("Car not found", 404));
  }

  res.status(201).json({
    status: "success",
    car,
  });
});

// register a new Car
const carObject = (req) => {

 
let carInfo = req.body;
return carInfo;
};
const createCar = catchAsyncError(async (req, res, next) => {

  let carObj = carObject(req);

  
  
  const car = await new Car(carObj);
  let newCar = await car.save();
  console.log(newCar);


  res.status(201).json({
      status: "success",
      carName: newCar.name,
      carID: newCar.id,
    });
});

// update Car details
const updateCar = catchAsyncError(async (req, res, next) => {
 


  let carObj = carObject(req);


  carObj.faceImg=`/uploads/profilePics/${req.files.faceImg[0].filename}`
  carObj.backImg=`/uploads/profilePics/${req.files.backImg[0].filename}`



  //TODO WHEN WORKING DAYS CAHNGE ==> HANDLE FUTURE PRERESERVED APPOINTMENTS
  let car = await Car.findOneAndUpdate(
    { _id: req.params.id },
    carObj,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!car) {
    return next(new ErrorHandler("Car not found", 404));
  }
  res.status(200).json({
    status: "success",
    carName: car.name,
  });
});

const deleteCar = catchAsyncError(async (req, res, next) => {
  const car = await Car.findByIdAndDelete(req.params.id);

  if (!car) {
    return next(new ErrorHandler("req not found", 404));
  }
});

module.exports = {
  getAllCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
