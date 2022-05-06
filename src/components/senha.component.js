import React, { Component } from "react";
import SenhaDataService from "../services/senha.service";

export default class Senha extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateSenha = this.updateSenha.bind(this);
    this.deleteSenha = this.deleteSenha.bind(this);

    this.state = {
      currentSenha: {
        key: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { senha } = nextProps;
    if (prevState.currentSenha.key !== senha.key) {
      return {
        currentSenha: senha,
        message: ""
      };
    }

    return prevState.currentSenha;
  }

  componentDidMount() {
    this.setState({
      currentSenha: this.props.senha,
    });
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSenha: {
          ...prevState.currentSenha,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentSenha: {
        ...prevState.currentSenha,
        description: description,
      },
    }));
  }

  updatePublished(status) {
    SenhaDataService.update(this.state.currentSenha.key, {
      published: status,
    })
      .then(() => {
        this.setState((prevState) => ({
          currentSenha: {
            ...prevState.currentSenha,
            published: status,
          },
          message: "A senha foi atualizada com sucesso!",
        }));
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateSenha() {
    const data = {
      title: this.state.currentSenha.title,
      description: this.state.currentSenha.description,
    };

    SenhaDataService.update(this.state.currentSenha.key, data)
      .then(() => {
        this.setState({
          message: "A senha foi atualizada com sucesso!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteSenha() {
    SenhaDataService.delete(this.state.currentSenha.key)
      .then(() => {
        this.props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentSenha } = this.state;

    return (
      <div>
        <h4>Senha</h4>
        {currentSenha ? (
          <div className="edit-form">
            <form>
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentSenha.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Senha</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentSenha.description}
                  onChange={this.onChangeDescription}
                />
              </div>


            </form>



            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.deleteSenha}
            >
              Deletar
            </button>

            <button
              type="submit"
              className="m-3 btn btn-sm btn-success"
              onClick={this.updateSenha}
            >
              Atualizar
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Por favor clique em uma senha...</p>
          </div>
        )}
      </div>
    );
  }
}
