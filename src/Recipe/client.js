import axios from 'axios';
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
export const findRecipeById = async (recipeId) => {
    const response = await axios.get(`${BASE_API}/recipes/${recipeId}`);
    return response.data;
}