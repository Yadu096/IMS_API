const express = require("express");
const app = express();
const port = 3000;
const db = require("./config/mongoose");

//Parse the from data
app.use(express.urlencoded({ extended: false }));

//use the routes
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.log("***Could not connect to the port*** ", err);
  }

  console.log("Server is up and running on the port: ", port);
});
