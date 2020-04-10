const Dev = require("../src/models/Dev");
const axios = require("axios");
const parseStringAsArray = require("../utils/ParseStringAsArray");
const googleWebServices = require("../utils/GoogleWebServices");

module.exports = {
  //Busca Devs em um raio de 10km
  //Filtra por tecn.
  async index(request, response) {
    const { address, tecnologias } = request.query;

    //popula a localizacao com o resultado da api do google
    const resultgoogleWebServices = await googleWebServices(address, "AIzaSyABrQMxiQHyLzOGp9xy5FflGWuLQWUHMrI");
    const { lat, lng } = resultgoogleWebServices;

    //formatacao das tecnologias string para array
    const tecnologiasArray = parseStringAsArray(tecnologias);

    const devs = await Dev.find({
      tecnologias: {
        $in: tecnologiasArray
      },
      location: {
        // https://docs.mongodb.com/manual/reference/operator/query/near/
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [lng, lat]
          },
          $maxDistance: 10000
        }
      }
    });

    return response.json({ devs });
  }
};
