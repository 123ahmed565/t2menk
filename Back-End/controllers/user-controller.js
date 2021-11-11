const APIFearures = require("../utils/APIFeatures");
const {User} = require('../models/user');

const catchAsyncError = require("../utils/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const features = new APIFearures(User.find(), req.query)
    .filter()
    .sort()
    .project()
    .paginate();

  const lengthFeatures = new APIFearures(User.find(), req.query).filter();

  const users = await features.query;
  const countQuery = await lengthFeatures.query;

  // Send response
  res.status(200).json({
    status: "success",
    count: users.length,
    totalCount: countQuery.length,
    usersList: users,
  });
});

// get req by id
const getUser = catchAsyncError(async (req, res, next) => {
  let user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return next(new ErrorHandler("type not found", 404));
  }

  res.status(201).json({
    status: "success",
    user,
  });
});

// register a new type
const userObject = (req) => {
  console.log(req.body);

 
let userInfo = req.body;
return userInfo;
};
const createUser = catchAsyncError(async (req, res, next) => {
  let userObj = userObject(req);
  
  
  const user = await new User(userObj);
  let newUser = await user.save();
  console.log(newUser);


  res.status(201).json({
      status: "success",
      userName: newUser.name,
      userID: newUser.id,
    });
});

// update type details
const updateUser = catchAsyncError(async (req, res, next) => {
 


  let userObj = userObject(req);


  //TODO WHEN WORKING DAYS CAHNGE ==> HANDLE FUTURE PRERESERVED APPOINTMENTS
  let user = await User.findOneAndUpdate(
    { _id: req.params.id },
    userObj,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!user) {
    return next(new ErrorHandler("type not found", 404));
  }

  res.status(200).json({
    status: "success",
    userName: user.name,
  });
});

const deleteUser = catchAsyncError(async (req, res, next) => {
  console.log("Sss");
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler("req not found", 404));
  }
  res.status(200).json({
    status: "Successfully deleted",
  });
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
