import axios from 'axios';
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";

const client = axios.create({
    withCredentials: true,
    baseURL: BASE_API_URL
})

export const recipeUsesIngredient = async (recipeId, ingredientId) => {
    const response = await client.post(`/recipes/${recipeId}/ingredients/${ingredientId}`)
    return response.data;
}

export const recipesUnusesIngredient = async (recipeId, ingredientId) => {
    const response = await client.delete(`/recipes/${recipeId}/ingredients/${ingredientId}`)
    return response.data;
}

export const findIngredientsUsedByRecipe = async (recipeId) => {
    const response = await client.get(`/recipes/${recipeId}/ingredients`)
    return response.data;
}

export const findRecipesUsingIngredient = async (ingredientId) => {
    const response = await client.get(`/ingredients/${ingredientId}/recipes`)
    return response.data;
}