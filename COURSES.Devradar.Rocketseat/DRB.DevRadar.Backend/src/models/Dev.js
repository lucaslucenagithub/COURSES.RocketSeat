const mongoose = require("mongoose");
const PointSchema = require("../../utils/PointSchemas");

const DevSchema = new mongoose.Schema({
  name: String,
  github_userName: String,
  bio: String,
  avatar_url: String,
  tecnologias: [String],
  location: {
    type: PointSchema,
    index: "2dsphere"
  }
});

module.exports = mongoose.model("Dev", DevSchema);
