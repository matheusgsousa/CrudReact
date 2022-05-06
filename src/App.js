import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import safetykey from './img/safetykey.svg';
import AddSenha from "./components/add-senha.component";
import SenhasList from "./components/senhas-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-light" style={{ backgroundColor: "#E5E5E5 " }}>
          <a href="/senhas" className="navbar-brand">
            <img src={safetykey} height={50} width={100} />
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/senhas"} className="nav-link active">
                Senhas
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link active">
                Adicionar Senha
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <h2>Safety Key</h2>
          <Switch>
            <Route exact path={["/", "/senhas"]} component={SenhasList} />
            <Route exact path="/add" component={AddSenha} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
