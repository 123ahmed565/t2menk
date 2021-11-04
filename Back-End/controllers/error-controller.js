const ErrorHandler = require("./../utils/ErrorHandler");
const handleCastError = (err) => {
  //NOTE HANDLE INVALID ID
  console.log(err);
  const msg = `Invalid ${err.path}: ${err.value}`;
  return new ErrorHandler(msg, 400);
};
const handleDuplicateKeyError = (err) => {
  //NOTE HANDLES DUPLICATE KEY // MONGO ERROR
  const value = err.keyValue;
  console.log(err);
  const msg = `Duplicate field value: "${Object.values(
    value
  )}" please try another value`;
  return new ErrorHandler(msg, 400);
};
const handleValidationError = (err) => {
  console.log(err);
  const errors = Object.values(err.errors).map(
    (el) => `${el.path}[${el.kind}]:${el}`
  );
  const msg = `Validation Error ==>> ${errors.join(". ")}`;
  return new ErrorHandler(msg, 400);
};
const sendErrorInDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    msg: err.message,
    error: { ...err },
    stack: err.stack,
  });
};

const sendErrorInProd = (err, res) => {
  if (err.isOperationalError) {
    res.status(err.statusCode).json({
      status: err.status,
      msg: err.message,
    });
  } else {
    console.error("Error", err);
    res.status(500).json({
      status: "error",
      msg: "Something went very wrong!", // incase of a programmatical errors
    });
  }
};

module.exports = {
  handleCastError,
  handleDuplicateKeyError,
  handleValidationError,
  sendErrorInDev,
  sendErrorInProd,
};
