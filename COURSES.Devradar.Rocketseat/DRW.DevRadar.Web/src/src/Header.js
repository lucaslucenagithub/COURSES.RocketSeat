import React from "react"; //necessário toda vez que for utilizar o JSX

//sempre que for adicionar uma variavel, funcao, estado, etc usando a linguagem javascript(no caso, um title que foi atribuido 
//como propriedade) utilizamos as {}
function Header(props) {
  return <h1>{props.title}</h1>;
}

export default Header;
