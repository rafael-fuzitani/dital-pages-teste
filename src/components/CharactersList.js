import React, { Component } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  callCharacters,
  selectCharacter,
  getComics
} from "../actions/rootActions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class CharactersList extends Component {
  constructor() {
    super();
    this.state = {
      offset: 0,
      paginationIndex: 0,
      pagesList: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handlePagination = this.handlePagination.bind(this);
  }

  componentDidMount() {
    this.getMarvelData(20, 0);
    this.paginationIndexHandler(this.state.paginationIndex);
  }

  getMarvelData(limit, offset) {
    const privateKey = this.props.privateKey;
    const publicKey = this.props.publicKey;
    const URI = "/v1/public/characters";
    const timeStamp = moment().unix();
    const hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString(
      CryptoJS.enc.Hex
    );
    let params = `?apikey=${publicKey}&ts=${timeStamp}&hash=${hash}`;

    axios
      .get(
        `https://gateway.marvel.com:443/${URI}${params}&limit=${limit}&offset=${offset}`
      )
      .then(res => {
        const characters = res.data;
        console.log(res.data);
        this.props.callCharacters(characters);
      });
  }

  handleClick(e) {
    this.props.selectCharacter(e);
  }

  handlePagination(direction) {
    direction === "next"
      ? this.state.offset < this.props.characters.data["total"] &&
        this.setState({
          offset: this.state.offset + 20,
          paginationIndex: this.state.paginationIndex + 1
        })
      : this.state.offset > 0 &&
        this.setState({
          offset: this.state.offset - 20,
          paginationIndex: this.state.paginationIndex - 1
        });
    this.getMarvelData(20, this.state.offset);

    this.paginationIndexHandler(this.state.paginationIndex);
  }

  choosePaginationPage(offset) {
    this.getMarvelData(20, offset);
  }

  paginationIndexHandler(paginationIndex) {
    const pagesList = [];

    for (let i = paginationIndex; i < paginationIndex + 6; i++) {
      pagesList.push(i);
    }
    this.setState({ pagesList: pagesList });
  }

  render() {
    const pagesIndex = this.state.pagesList.map(page => {
      const offset = page * 20;
      return (
        <li
          className="waves-effect col s2"
          onClick={() => this.choosePaginationPage(offset)}
          key={page}
        >
          {page}
        </li>
      );
    });
    return (
      <div>
        <ul style={{ listStyle: "none" }} className="container collection">
          <li key={"list-title"} className="row collection-item">
            <h4 className="col s3">Nome</h4>
            <h4 className="col s6">Descrição</h4>
            <h4 className="col s3">Última Atualização</h4>
          </li>
          {this.props.characters.data !== undefined &&
            this.props.characters.data["results"].map(character => {
              return (
                <li
                  key={character.id}
                  name={character.name}
                  className="row collection-item"
                  onClick={e => this.handleClick(character, e)}
                >
                  <Link to="/character-details">
                    <p className="col s3">{character.name}</p>
                    <p className="col s6">{character.description}</p>
                    <p className="col s3">{character.modified}</p>
                  </Link>
                </li>
              );
            })}
        </ul>
        <div className="container">
          <div className="row">
            <button
              className="waves-effect waves-light btn col s4"
              onClick={() => this.handlePagination("prev")}
            >
              Prev
            </button>
            <div className="col s4">
              <ul className="pagination">{pagesIndex}</ul>
            </div>
            <button
              className="waves-effect waves-light btn col s4"
              onClick={() => this.handlePagination("next")}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    privateKey: state.privateKey,
    publicKey: state.publicKey,
    characters: state.characters,
    selectedCharacter: state.selectedCharacter,
    selectedCharacterComics: state.selectedCharacterComics
  };
};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callCharacters,
      selectCharacter,
      getComics
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharactersList);
