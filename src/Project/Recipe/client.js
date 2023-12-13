import axios from 'axios';
import * as ingredientsClient from '../Ingredients/client';
import * as nutrientsClient from '../Nutrients/client';



export const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:3000";
export const SPOONACULAR_SEARCH_API = "https://api.spoonacular.com/recipes/complexSearch";
export const SPOONACULAR_RECIPE_DETAIL_API = "https://api.spoonacular.com/recipes";
export const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
export const SEARCH_RESULT_NUMBER = 1;

// Search recipes from the API and return the list of spoonacularIds
export const searchRecipesFromAPI = async (searchTerm, isVegetarian, isGlutenFree) => {
    const link = `${SPOONACULAR_SEARCH_API}?apiKey=${API_KEY}&query=${searchTerm}&number=${SEARCH_RESULT_NUMBER}&instructionsRequired=true`;
    if (isVegetarian) {
        link += "&diet=vegetarian";
    }
    if (isGlutenFree) {
        link += "&intolerances=gluten";
    }
    const response = await axios.get(link);
    const ids = []
    for (const recipe of response.results) {
        ids.push(recipe.id);
    }
    return ids;
}

// Grab details of one recipe from the API and return the recipe JSON object
export const grabRecipeDetailsFromAPI = async (spoonacularId) => {

    const response = await axios.get(`${SPOONACULAR_RECIPE_DETAIL_API}/${spoonacularId}/information?apiKey=${API_KEY}&includeNutrition=true`);

    // Prepare the ingredients information
    const ingredients = []
    for (const ing of response.extendedIngredients) {
        const ingredient = {
            name: ing.nameClean || ing.name,
            amount: ing.amount || ing.measures.us.amount,
            unit: ing.unit || ing.measures.us.unitShort
        }
        ingredients.push(ingredient);
    }

    // Prepare the nutrients information
    const nutrients = []
    for (const nut of response.nutrition.nutrients) {
        const nutrient = {
            name: nut.name,
            amount: nut.amount,
            unit: nut.unit
        }
        nutrients.push(nutrient);
    }

    // Prepare the steps
    const steps = []
    for (const st of response.analyzedInstructions[0].steps) {
        const step = {
            number: st.number,
            step: st.step
        }
        steps.push(step);
    }

    const recipe = {
        title: response.title,
        spoonacularId: response.id,
        image: response.image,
        author: response.sourceName || "Spoonacular",
        cuisine: response.cuisines[0] || "Other",
        ingredients: ingredients,
        nutrients: nutrients,
        instructions: steps || "No instructions available"
    }

    return recipe
}

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

export const findRecipeBySearchTerm = async (searchTerm) => {
    const response = await axios.get(`${BASE_API}/recipes/search/${searchTerm}`);
    return response.data;
}

export const findRecipeBySpooonacularId = async (spoonacularId) => {
    const response = await axios.get(`${BASE_API}/recipes/spoonacular/${spoonacularId}`);
    return response.data;
}









