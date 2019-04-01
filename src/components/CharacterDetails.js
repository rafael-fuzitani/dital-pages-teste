import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";
import { getComics } from "../actions/rootActions";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";

class CharacterDetails extends Component {
  componentWillMount() {
    const charId = this.props.selectedCharacter.id;
    const privateKey = this.props.privateKey;
    const publicKey = this.props.publicKey;
    const URI = `/v1/public/characters/${charId}/comics`;
    const timeStamp = moment().unix();
    const hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString(
      CryptoJS.enc.Hex
    );
    let params = `?apikey=${publicKey}&ts=${timeStamp}&hash=${hash}`;

    axios.get(`https://gateway.marvel.com:443/${URI}${params}`).then(res => {
      console.log("Comics ", res.data);
      const comics = res.data.data["results"];
      this.props.getComics(comics);
    });
  }
  render() {
    console.log(this.props.selectedCharacterComics);
    const character = this.props.selectedCharacter;
    return (
      <div className="container">
        <div className="row">
          <div className="col s4">
            <img
              style={{ width: "100%" }}
              src={`${character.thumbnail.path}.${
                character.thumbnail.extension
              }`}
            />
          </div>
          <div className="col s8">
            <h1>{character.name}</h1>
            <p>{character.description}</p>
          </div>
        </div>
        <div className="row">
          <Link className="waves-effect waves-light btn" to="/characters-list">
            Voltar
          </Link>
        </div>
        <div>
          <h3>Fascículos</h3>
        </div>
        <div className="collection">
          {this.props.selectedCharacterComics.map(comic => {
            return (
              <div className="row collection-item" key={comic.resourceURI}>
                <div className="col s3">
                  <img
                    style={{ width: "100%" }}
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  />
                </div>
                <div className="col s9">
                  <div className="row">
                    <p className="col s6">
                      <strong>Título: </strong>
                      {comic.title}
                    </p>
                    <p className="col s6">
                      <strong>Número de Capa: </strong>
                      {comic.issueNumber}
                    </p>
                  </div>
                  <div className="row">
                    <p className="col s12">{comic.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    privateKey: state.privateKey,
    publicKey: state.publicKey,
    selectedCharacter: state.selectedCharacter,
    selectedCharacterComics: state.selectedCharacterComics
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getComics
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterDetails);
