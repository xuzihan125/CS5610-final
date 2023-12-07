import axios from 'axios';
export const SPOONACULAR_API = "https://api.spoonacular.com/recipes/complexSearch";
export const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
export const SEARCH_RESULT_NUMBER = 1;

export const findRecipes = async (searchTerm) => {
    const response = await axios.get(`${SPOONACULAR_API}?apiKey=${API_KEY}&query=${searchTerm}&number=${SEARCH_RESULT_NUMBER}&includeInstruction=true`);
    return response.data.results;
}