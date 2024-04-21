import axios from 'axios';
import * as ingredientsClient from '../Ingredients/client';
import * as nutrientsClient from '../Nutrients/client';
import * as usersClient from '../Users/client';


export const BASE_API = process.env.REACT_APP_BASE_API_URL || "http://localhost:4000";
export const SPOONACULAR_SEARCH_API = "https://api.spoonacular.com/recipes/complexSearch";
export const SPOONACULAR_RECIPE_DETAIL_API = "https://api.spoonacular.com/recipes";
export const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;
export const SEARCH_RESULT_NUMBER = 1;

// Search recipes from the API and return the list of spoonacularIds
export const searchRecipesFromAPI = async (searchTerm, isVegetarian, isGlutenFree) => {
    return findAllRecipes();
    const recipes = findRecipesByTitle(searchTerm);
    console.log(recipes);
    return recipes.filter((e)=>e.isVegetarian === isVegetarian && e.isGlutenFree===isGlutenFree);
    // let link = `${SPOONACULAR_SEARCH_API}?apiKey=${API_KEY}&query=${searchTerm}&number=${SEARCH_RESULT_NUMBER}&instructionsRequired=true`;
    // if (isVegetarian) {
    //     link += "&diet=vegetarian";
    // }
    // if (isGlutenFree) {
    //     link += "&intolerances=gluten";
    // }
    // // console.log(link);
    // const response = await axios.get(link);
    // const ids = []
    // if (response) {
    //     for (const recipe of response.data.results) {
    //         ids.push(recipe.id);
    //     }
    // }
    // console.log(ids)
    // return ids;
}

// Grab details of one recipe from the API and return the recipe JSON object
export const grabRecipeDetailsFromAPI = async (spoonacularId) => {
    const link = `${SPOONACULAR_RECIPE_DETAIL_API}/${spoonacularId}/information?apiKey=${API_KEY}&includeNutrition=true`;
    console.log(link)
    const response = await axios.get(link);

    // Prepare the ingredients information
    const ingredients = []
    for (const ing of response.data.extendedIngredients) {
        const ingredientElement = {
            ingredient: ing.nameClean || ing.name,
            quantity: ing.amount || ing.measures.us.amount,
            unit: ing.unit || ing.measures.us.unitShort
        }
        ingredients.push(ingredientElement);
    }

    // Prepare the nutrients information
    const nutrients = []
    for (const nut of response.data.nutrition.nutrients) {
        const nutrientElement = {
            nutrient: nut.name,
            amount: nut.amount,
            unit: nut.unit
        }
        nutrients.push(nutrientElement);
    }

    // Prepare the steps
    // const steps = []
    // for (const st of response.data.analyzedInstructions[0].steps) {
    //     console.log(st)
    //     const step = {
    //         step: st.number,
    //         instruction: st.step
    //     }
    //     steps.push(step);
    // }
    const formattedSteps = response.data.analyzedInstructions[0].steps.map(({ number, step }) => `${number}. ${step}`).join("\n");

    const officialAuthor = await usersClient.findUserByUsername("Spoonacular");
    const officialAuthorId = officialAuthor._id;

    const recipe = {
        title: response.data.title,
        spoonacularId: response.data.id,
        image: response.data.image,
        author: officialAuthorId,
        cuisine: response.data.cuisines[0] || "Other",
        ingredients: ingredients,
        nutrients: nutrients,
        instructions: formattedSteps || "No instructions available"
    }
    console.log("Recipe: ")
    console.log(recipe)

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

export const findRecipesBySearchTerm = async (searchTerm) => {
    const response = await axios.get(`${BASE_API}/recipes/search/${searchTerm}`);
    return response.data;
}

export const findRecipeBySpoonacularId = async (spoonacularId) => {
    const response = await axios.get(`${BASE_API}/recipes/spoonacular/${spoonacularId}`);
    return response.data;
}









