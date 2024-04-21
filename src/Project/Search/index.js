import React, { useState, useEffect } from "react";
import {Link, useNavigate, useRouteLoaderData} from "react-router-dom";
import { useParams } from "react-router-dom";
import * as recipesClient from "../Recipes/client.js";
import * as ingredientsClient from "../Ingredients/client.js";
import * as nutrientsClient from "../Nutrients/client.js";
import * as recipesUseIngredientsClient from "../RecipesUseIngredients/client.js";
import * as recipesHaveNutrientsClient from "../RecipesHaveNutrients/client.js";
import { useSelector } from "react-redux";
import RecipeCard from "../Recipes/RecipeCard";


function Search() {
    const urlSearchTerm = useParams().searchTerm;
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm || "Apple");
    const [recipes, setRecipes] = useState(null);
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.userReducer);

    // 1. Search recipes from Spoonacular API
    // 2. Use the list of recipe ids from step 1 to grab the details of each recipe
    // 3. Add ingredients and nutrients from each recipe to respective databases
    // 4. Add the recipe to the recipe database
    // 5. Add recipe-ingredient, recipe-nutrient connection to DBs
    // 6. Fetch the recipes based on: recipe ids (spoonacular), recipe search term (mongoDB), ingredients search term (mongoDB)
    // 7. Filter out duplicates based on recipe's _id
    // 8. Display the results in a list
    // const fetchRecipes = async (urlSearchTerm) => {
    //     // Grab the recipe ids from Spoonacular API
    //     console.log("start search")
    //     const spoonacularIds = await recipesClient.findAllRecipes();//searchRecipesFromAPI(urlSearchTerm, currentUser.isVegetarian, currentUser.isGlutenIntolerant);
    //     console.log("finish search")
    //     console.log(spoonacularIds)
    //     // If this spoonacularId is not yet in theDB, grab the details of each recipe from Spoonacular API and add to recipes array
    //     const newRecipes = []
    //     for (const spoonacularId of spoonacularIds) {
    //         // Detect if the recipe is already in the DB
    //         const existingRecipe = await recipesClient.findRecipeBySpoonacularId(spoonacularId);
    //         if (!existingRecipe) {
    //             const recipe = await recipesClient.grabRecipeDetailsFromAPI(spoonacularId)
    //             console.log("Recipe fresh from API: ")
    //             console.log(recipe)
    //             newRecipes.push(recipe);
    //         }
    //     }
    //     // Add ingredients and nutrients from each recipe to respective databases
    //     // Notice that the ingredients in recipes have names, not ObjectIds
    //     for (const newRecipe of newRecipes) {
    //         for (const ingredientElement of newRecipe.ingredients) {
    //             // If the ingredient is not in the DB, add it to the ingredients DB
    //             const existingIngredient = await ingredientsClient.findIngredientByName(ingredientElement.ingredient);
    //             if (!existingIngredient) {
    //                 const ingredient = await ingredientsClient.createIngredient({ name: ingredientElement.ingredient });
    //             }
    //             // Replace the ingredient name with the ingredient ObjectId
    //             const ingredient = await ingredientsClient.findIngredientByName(ingredientElement.ingredient)
    //             const ingredient_id = ingredient._id;
    //             ingredientElement.ingredient = ingredient_id
    //             console.log("Final ingredientElement: ")
    //             console.log(ingredientElement)
    //         }
    //         for (const nutrientElement of newRecipe.nutrients) {
    //             // If the nutrient is not in the DB, add it to the nutrients DB
    //             const existingNutrient = await nutrientsClient.findNutrientByName(nutrientElement.nutrient);
    //             if (!existingNutrient) {
    //                 await nutrientsClient.createNutrient({ name: nutrientElement.nutrient });
    //             }
    //             // Replace the nutrient name with the nutrient ObjectId
    //             const nutrientInDB = await nutrientsClient.findNutrientByName(nutrientElement.nutrient)
    //             const nutrientInDB_id = nutrientInDB._id;
    //             nutrientElement.nutrient = nutrientInDB_id
    //         }
    //         // Add recipe to the recipes DB
    //         await recipesClient.createRecipe(newRecipe);
    //         // Add recipe-ingredient, recipe-nutrient connections to DBs
    //         const newRecipeInDB = await recipesClient.findRecipeBySpoonacularId(newRecipe.spoonacularId)
    //         const newRecipeInDB_id = newRecipeInDB._id;
    //         for (const ingredientElement of newRecipe.ingredients) {
    //             const ingredient_id = ingredientElement.ingredient;
    //             await recipesUseIngredientsClient.recipeUsesIngredient(newRecipeInDB_id, ingredient_id);
    //         }
    //         for (const nutrientElement of newRecipe.nutrients) {
    //             const nutrient_id = nutrientElement.nutrient;
    //             await recipesHaveNutrientsClient.recipeHasNutrient(newRecipeInDB_id, nutrient_id);
    //         }
    //     }
    //     // Grab the recipes from recipes DB based on spoonacularIds, recipe search term; ingredients search term -> ingredient._ids -> recipe._ids in recipes DB
    //     const recipesFromSpoonacularIds = []
    //     for (const spoonacularId of spoonacularIds) {
    //         const recipe = await recipesClient.findRecipeBySpoonacularId(spoonacularId);
    //         recipesFromSpoonacularIds.push(recipe);
    //     }
    //     const recipesFromSearchTerm = await recipesClient.findRecipesBySearchTerm(urlSearchTerm);
    //     const recipesFromIngredients = []
    //     const ingredients = await ingredientsClient.findIngredientsBySearchTerm(urlSearchTerm);
    //     for (const ingredient of ingredients) {
    //         const ingredient_id = ingredient._id;
    //         const recipesUsingIngredient = await recipesUseIngredientsClient.findRecipesUsingIngredient(ingredient_id);
    //         for (const recipe of recipesUsingIngredient) {
    //             recipesFromIngredients.push(recipe);
    //         }
    //     }
    //     // Filter out duplicates based on recipe's _id
    //     const finalRecipes = [...recipesFromSpoonacularIds, ...recipesFromSearchTerm, ...recipesFromIngredients];
    //     const finalRecipesNoDup = finalRecipes.reduce((unique, recipe) => {
    //         const isDuplicateId = unique.some(item => item._id === recipe._id)
    //         if (!isDuplicateId) {
    //             unique.push(recipe)
    //         }
    //         return unique
    //     }, [])
    //     setRecipes(finalRecipesNoDup);
    // }

    const fetchRecipes = async () => {
        const result = await recipesClient.findRecipesBySearchTerm(urlSearchTerm);
        setRecipes(result);
        console.log(recipes)
    }

    useEffect(() => {
        if (urlSearchTerm) {
            fetchRecipes();
        }
    }, [urlSearchTerm]);

    return (
        <div className="container-fluid">
            <div className="d-flex mx-5 my-3" role="search">
                <input className="form-control me-2" type="text" placeholder="Recipes, ingredients, ..." aria-label="Search" value={searchTerm} onChange={(event) => {
                    setSearchTerm(event.target.value);
                }} />
                <button className="btn btn-outline-success" onClick={() => navigate(`/search/${searchTerm}`)}>Search Recipes</button>
            </div>
            <div>
                <div className='d-none d-md-block'>
                    {urlSearchTerm && <h2>Search Results for "{searchTerm}"</h2>}
                    <div className='row row-cols-1 row-cols-md-3 row-cols-xl-4 r g-4'>
                        {
                            recipes && recipes.length>0 && recipes.map((r, index)=>{
                                return (
                                    <div className='col'>
                                        <RecipeCard recipe={r} refetchData={fetchRecipes} />
                                    </div>
                                )})
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Search;
