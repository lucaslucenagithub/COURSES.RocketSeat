const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors'); 
const app = express("");

//importa o modulo exportado de routes.
const routes = require("./routes");

const url = 'mongodb://127.0.0.1:27017/rocketSeat';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
