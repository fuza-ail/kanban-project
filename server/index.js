const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./router");

const port = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(port, ()=>{
  console.log(`Listening to port ${port}`);
});