
const baseURL = "https://rickandmortyapi.com/api";

export const getCharacter = baseURL+"/character";
export const getCharByName = (name:string) => baseURL+`/character/?name=${name}`;
export const getCharById = (id:string) => baseURL+`/character/${id}`