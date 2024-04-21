import axios from 'axios';


export const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

export const createRecipe = async (recipe) => {
    const response = await axios.post(`${BASE_API}/recipes`, recipe);
    return response.data;
}

export const updateRecipe = async (recipe) => {
    const response = await axios.put(`${BASE_API}/recipes/${recipe.id}`, recipe);
    return response.data;
}

export const deleteRecipe = async (recipeId) => {
    const response = await axios.delete(`${BASE_API}/recipes/${recipeId}`);
    return response.data;
}

export const findRecipeById = async (recipeId) => {
    const response = await axios.get(`${BASE_API}/recipes/${recipeId}`);
    return response.data;
}

export const findAllRecipes = async () => {
    const response = await axios.get(`${BASE_API}/recipes`);
    return response.data;
}

export const findRecipesByTitle = async (title) => {
    const response = await axios.get(`${BASE_API}/recipes/title/${title}`);
    return response.data;
}

export const findRecipesByAuthorId = async (authorId) => {
    const response = await axios.get(`${BASE_API}/recipes/author/${authorId}`);
    return response.data;
}

export const findRecipesBySearchTerm = async (searchTerm) => {
    const response = await axios.get(`${BASE_API}/recipes/search/${searchTerm}`);
    return response.data;
}

export const findRecipeBySpoonacularId = async (spoonacularId) => {
    const response = await axios.get(`${BASE_API}/recipes/spoonacular/${spoonacularId}`);
    return response.data;
}









