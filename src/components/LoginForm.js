import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updatePrivateKey, updatePublicKey } from "../actions/rootActions";
import { bindActionCreators } from "redux";

class LoginForm extends Component {
  handleChange(event) {
    let change = {};

    change[event.target.name] = event.target.value;
    switch (event.target.name) {
      case "privatekey":
        this.props.updatePrivateKey(event.target.value);
        break;
      case "publickey":
        this.props.updatePublicKey(event.target.value);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Dados de Acesso</h1>
        <form>
          <label>
            Private_Key:
            <input
              type="text"
              name="privatekey"
              value={this.props.privateKey}
              onChange={this.handleChange.bind(this)}
            />
          </label>

          <label>
            Public_Key:
            <input
              type="text"
              name="publickey"
              value={this.props.publicKey}
              onChange={this.handleChange.bind(this)}
            />
          </label>
        </form>
        <div className="row">
          <Link className="waves-effect waves-light btn" to="/characters-list">
            Acessar
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    privateKey: state.privateKey,
    publicKey: state.publicKey
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updatePrivateKey,
      updatePublicKey
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
