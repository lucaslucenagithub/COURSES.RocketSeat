//padrões de nomenclatura para os controllers: index, show, store, update, destroy.
const axios = require("axios");
const Dev = require("../src/models/Dev");
const parseStringAsArray = require("../utils/ParseStringAsArray");
const googleWebServices = require("../utils/GoogleWebServices");

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async show(request, response) {
    const { github_userName } = request.query;
    const dev = await Dev.find({ github_userName });

    return response.json(dev);
  },

  //Rota de cadastro de usuario.
  async store(request, response) {
    const { github_userName, tecnologias, address } = request.body;

    //verifica cadastro existe banco
    let dev = await Dev.findOne({ github_userName });
    if (!dev) {
      //github
      const gitHubApiresponse = await axios.get(
        `https://api.github.com/users/${github_userName}` // template string
      );

      //Popula as variaveis com os dados retornados do github
      //Se o nome estiver vazio então ele consome o login do gitHub
      const { name = login, avatar_url, bio } = gitHubApiresponse.data;

      //popula a localizacao com o resultado da api do google
      const resultgoogleWebServices = await googleWebServices(address, "AIzaSyABrQMxiQHyLzOGp9xy5FflGWuLQWUHMrI");
      const { lng, lat } = resultgoogleWebServices;

      //formatacao das tecnologias string para array
      const tecnologiasArray = parseStringAsArray(tecnologias);

      //metodo para criar o usuario no banco
      dev = await Dev.create({
        name,
        github_userName,
        bio,
        avatar_url,
        tecnologias: tecnologiasArray,
        location: {
          type: "Point",
          coordinates: [lng, lat]
        }
      });

      return response.json({
        mensagem: "Dev cadastrado com sucesso!",
        informacoesUsuario: dev
      });
    } else {
      return response.json({
        mensagem: "Dev já possui cadastro!"
      });
    }
  }
};
