//Este arquivo é responsável por mandar as informações do JSX criados na aplicação para o index.html localizado em public para ser
//mostrado no browser.
//OBS: JS = Javascript, X = XML, sintaxe HTML.

//Esse arquivoe não mudará nunca do que está abaixo.

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
