module.exports = function ParseStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map(tecnologias => tecnologias.trim());
};
