const mongoose = require("mongoose");
const dotenv = require("dotenv");

// NOTE UNCAUGHTEXCEPTIONS SHOULD BE AT THE TOP BEFORE ANY OTHER CODE EXCUTED
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTIONS!..💥💥");
  console.log(`Error ==> ${err.stack}`);
  process.exit(1);
  //ALERT IN PRODUCTION YOU WILL NEED TO RESTAST THE APPLICATION
  // SOME PROVIDERS DO IT BY DEFAULT BUT YOU NEED TO MAKE SURE OF IT
});

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.CONNECTIONDB;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'taamenk-database'

  })
  .then(console.log("database connected successfully"));

// start server
const port = 8000;
const server = app.listen(process.env.PORT||port, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT||port}`);
});

// Subscribe to unhandledRejection event emmited by tht process object
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!..💥💥");
  console.log(err);
  server.close(() => {
    //shutdown the application after closing the server and all pending requests
    process.exit(1);
    //ALERT IN PRODUCTION YOU WILL NEED TO RESTAST THE APPLICATION
    // SOME PROVIDERS DO IT BY DEFAULT BUT YOU NEED TO MAKE SURE OF IT
  });
});
