const { Router } = require("express");
const routes = Router();

const DevController = require("../controllers/DevController");
const SearchController = require("../controllers/SearchController");

routes.get("/api/test", (request, response) => {
  return response.json({ mensagem: "Api funcionando com sucesso!" });
});

//#region DevController
routes.get("/Devs/GetAll", DevController.index);
routes.get("/Devs/GetByUsername", DevController.show);
routes.post("/Devs/Register", DevController.store);
//#endregion

//#region SearchController
routes.get("/Search", SearchController.index);
//#endregion

//exporta as rotas para aplicação inteira.
module.exports = routes;
