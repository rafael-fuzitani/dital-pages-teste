const initState = {
  privateKey: "",
  publicKey: "",
  characters: [],
  selectedCharacter: [],
  selectedCharacterComics: []
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "CALL_CHARACTERS":
      return { ...state, characters: action.payload };
    case "SELECT_CHARACTER":
      return { ...state, selectedCharacter: action.payload };
    case "GET_COMICS":
      return { ...state, selectedCharacterComics: action.payload };
    case "UPDATE_PRIVATEKEY":
      return { ...state, privateKey: action.payload };
    case "UPDATE_PUBLICKEY":
      return { ...state, publicKey: action.payload };
    default:
      break;
  }
  return state;
};

export default rootReducer;
