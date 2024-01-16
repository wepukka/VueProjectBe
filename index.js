require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");

app.use(cors());
app.use("/", routes);
const port = 3000;

mongoose
  .connect(
    process.env.MONGO_URL
    
  )
  .then((result) =>
    app.listen(port, () => {
      console.log("Running", port);
    })
  )
  .catch((err) => console.log(err));
