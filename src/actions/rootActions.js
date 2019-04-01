export const callCharacters = value => ({
  type: "CALL_CHARACTERS",
  payload: value
});

export const selectCharacter = value => ({
  type: "SELECT_CHARACTER",
  payload: value
});

export const getComics = value => ({
  type: "GET_COMICS",
  payload: value
});

export const updatePrivateKey = value => ({
  type: "UPDATE_PRIVATEKEY",
  payload: value
});

export const updatePublicKey = value => ({
  type: "UPDATE_PUBLICKEY",
  payload: value
});
