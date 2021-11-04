class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    (this.statusCode = statusCode),
      (this.status = `${statusCode}`.startsWith("4") ? "fail" : "error");
    this.isOperationalError = true; // NOTE TO IDENTIFY OPERATIONAL ERRORS FROM PROGRAMATICAL ERRORS

    Error.captureStackTrace(this, this.constructor); //NOTE CAPTURES WHERE THE ERROR HAPPENED
  }
}

module.exports = ErrorHandler;
