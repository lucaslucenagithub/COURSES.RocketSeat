const mongoose = require("mongoose");

//Objetos padrões que o mongoDB pede para calcular o espeço geométrico da terra
const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

module.exports = PointSchema;
