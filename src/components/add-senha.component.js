import React, { Component } from "react";
import SenhaDataService from "../services/senha.service";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class AddSenha extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveSenha = this.saveSenha.bind(this);
    this.newSenha = this.newSenha.bind(this);

    this.state = {
      title: "",
      description: "",
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveSenha() {
    let data = {
      title: this.state.title,
      description: this.state.description,
      published: false
    };

    SenhaDataService.create(data)
      .then(() => {
        console.log("Nova senha adicionada com sucesso!");
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newSenha() {
    this.setState({
      title: "",
      description: "",
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Nova senha adicionada com sucesso!</h4>
            <button className="btn btn-success" onClick={this.newSenha}>
              Adicionar nova senha
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <div class="input-group mb-3">
                <span class="input-group-text"><FontAwesomeIcon icon={faGlobe} /></span>
                <input type="text" class="form-control" id="title"
                  placeholder="Título/Usuário"
                  required
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  name="title" />
              </div>
            </div>

            <div className="form-group">
              <div class="input-group mb-3">
                <span class="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Senha"
                  required
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>
            </div>

            <button onClick={this.saveSenha} className="btn btn-success">
              Salvar
            </button>
          </div>
        )}
      </div>
    );
  }
}
