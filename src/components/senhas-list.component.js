import React, { Component } from "react";
import SenhaDataService from "../services/senha.service";

import Senha from "./senha.component";

export default class SenhasList extends Component {
  constructor(props) {
    super(props);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveSenha = this.setActiveSenha.bind(this);
    this.removeAllSenhas = this.removeAllSenhas.bind(this);
    this.onDataChange = this.onDataChange.bind(this);

    this.state = {
      senhas: [],
      currentSenha: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    SenhaDataService.getAll().on("value", this.onDataChange);
  }

  componentWillUnmount() {
    SenhaDataService.getAll().off("value", this.onDataChange);
  }

  onDataChange(items) {
    let senhas = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      senhas.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    this.setState({
      senhas: senhas,
    });
  }

  refreshList() {
    this.setState({
      currentSenha: null,
      currentIndex: -1,
    });
  }

  setActiveSenha(senha, index) {
    this.setState({
      currentSenha: senha,
      currentIndex: index,
    });
  }

  removeAllSenhas() {
    SenhaDataService.deleteAll()
      .then(() => {
        this.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { senhas, currentSenha, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Minhas Senhas</h4>

          <ul className="list-group">
            {senhas &&
              senhas.map((senha, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveSenha(senha, index)}
                  key={index}
                >
                  {senha.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllSenhas}
          >
            Deletar todas
          </button>
        </div>
        <div className="col-md-6">
          {currentSenha ? (
            <Senha
              senha={currentSenha}
              refreshList={this.refreshList}
            />
          ) : (
            <div>
              <br />
              <p>Clique em uma senha...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
