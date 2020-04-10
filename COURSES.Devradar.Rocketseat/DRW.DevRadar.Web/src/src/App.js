//React:
//Componente: bloco isolado de html, css e js o qual nao interfere no restante da aplicação.
//Propriedade: informacoes que um componente PAI passa para o componente FILHO.
//Estado: informações mantidas pelo componente (imutabilidade, melhora perfomance).

import React, { useState, useEffect } from "react";
import api from './services/api';
import "./global.css";
import "./app.css";
import "./sidebar.css";
import "./main.css";

// necessário o uso da div em caso de um componente debaixo do outro, porém pra nao atrapalhar as estilizacao usa-se: <></>
// function App() {
//   let [counter, setCounter] = useState(0);
//   function IncrementCounter(){
//     setCounter(counter + 1);
//   }
//   return(
//     <>
//   <Header title='Hello Worldd' />
//   <Header title='Hello Worldd' />
//   <Header title='Hello Worldd' />
//   <h1>Contador: {counter}</h1>
//   <button onClick = {IncrementCounter}>Incrementar</button>
//   </>
//   );
// }

//sempre importante começar pela estilização, depois pelas funcionalidades(conexão api, etc).
function App() {
  const [github_userName, setGithub_userName] = useState("");
  const [tecnologias, setTecnologias] = useState("");
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');

  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    ); //pede permissao pro usuario aceitar pegar sua localização automaticamente pelo browser
  }, []);

  async function handleAddDev(e) {
    e.preventDefault();
    const response = await api.post('/Devs/Register', {
      github_userName,
      tecnologias,
      address: endereco + ' ' + numero,
    })
    
      console.log(response.data)
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="">GitHub</label>
            <input
              name="github_userName"
              id="github_userName"
              required
              value={github_userName}
              onChange={e => setGithub_userName(e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="">Tecnologias</label>
            <input
              name="tecnologias"
              id="tecnologias"
              required
              value={tecnologias}
              onChange={e => setTecnologias(e.target.value)} />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="">Endereço</label>
              <input
                name="endereco"
                id="endereco"
                required
                value={endereco}
                onChange={e => setEndereco(e.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="">Número</label>
              <input
                name="numero"
                id="numero"
                required
                value={numero}
                onChange={e => setNumero(e.target.value)} />
            </div>
          </div>
          <div className="input-group2">
            <div className="input-block">
              <label htmlFor="">Latitude(auto)</label>
              <input
                type="number "
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="">Longitude(auto)</label>
              <input
                type="number"
                name="longitude"
                id="longitude"
                required value={longitude}
                onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars2.githubusercontent.com/u/44813085?s=460&v=4" alt="lucasgit2000" />
              <div className="user-info">
                <strong>Lucas Lucena</strong>
                <span>ReactJs, React Native, Node.js</span>
              </div>
            </header>
            <p>Bio</p>
            <a href="https://github.com/lucasgit2000?tab=repositories">Acessar Perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
