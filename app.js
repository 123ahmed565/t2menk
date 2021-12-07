const express = require('express');
const morgan = require('morgan');
const ErrorHandler = require('./utils/ErrorHandler');


const path = require('path');
const {
  handleCastError,
  handleDuplicateKeyError,
  handleValidationError,
  sendErrorInDev,
  sendErrorInProd,
} = require('./controllers/error-controller');
const app = express();
const cors = require('cors');

// Middlewares
// if (process.env.NODE_ENV === "development") {
app.use(morgan('dev'));
// }
// Handle any other route




app.use(express.json());
app.use(express.urlencoded());
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cors({ credentials: true }));
app.use(express.static(path.join(`${__dirname}/assets`)));

app.use(express.static('public'));


// Routess
const usersRoutes = require('./routes/users');
const carinsurance = require('./routes/carinsurance');









app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/carinsurance', carinsurance );



// handel view 
app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get('/loginAdminDashboard',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/admin-login.html"))
})
app.get('/adminDashboardPage',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/admin-dashboard.html"))
})
app.get('/showoffer',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/show-offer.html"))
})
app.get('/getoffer',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/getoffer.html"))
})
app.get('/home',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/index.html"))
})
app.get('/contactus',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/contactus.html"))
})

app.get('/whoUs',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/3an-aman-lek.html"));
})
app.get('/typeofInsurance',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/anwa3-t2men.html"));
})
app.get('/carInsurance',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/t2men-cars.html"));
})
app.get('/propertyInsurance',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/t2men-mmtlkat.html"));
})
app.get('/lifeInsurance',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/t2men-7yah.html"));
})
app.get('/travelInsurance',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/t2men-safr.html"));
})
app.get('/medicalInsurance',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/t2men-teby.html"));
})
app.get('/privacyPolicy',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/seah-il.html"));
})
app.get('/offersperson',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/offers-person.html"));
})
app.get('/offercompany',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/offer-company.html"));
})
app.get('/insuranceproducts',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/insurance-products.html"));
})
app.get('/insurancecompany',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/insurance-companies.html"));
})
app.get('/jobVacancies',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/get-jop.html"));
})
app.get('/termsAndCondition',(req, res) => {
  res.sendFile(path.join(__dirname,"/views/al4rot-we-alafkam.html"));
})

// Handle any other route

    app.all('*', (req, res, next) => {
      next(new ErrorHandler(`Can't find ${req.originalUrl}`, 404));
    });


    
    app.use((err, req, res, next) => {
      err.statusCode = err.statusCode || 500; // for errors without a status code
      err.status = err.status || 'error';
      // if (process.env.NODE_ENV === "development") {
      sendErrorInDev(err, res);
      // // }
      //  else if (process.env.NODE_ENV === "production") {
      // in the following 3 cases we make a new error object cuz by default
      // they are not handled as an operational error
      let error = { ...err };
      if (error.kind === 'ObjectId') {
        // NOTE ERROR.KIND IN PROD IS ERROR.NAME IN DEV
        error = handleCastError(error);
      }
      if (error.code === 11000) {
        error = handleDuplicateKeyError(error);
      }
      if (error._message.includes('validation')) {
        // NOTE THIS IS A WORK AROUND YOU NEED TO REVISIT
        error = handleValidationError(error);
      }
    
      sendErrorInProd(error, res);
      // }
    });


module.exports = app;
