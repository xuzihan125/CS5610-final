import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client.js";
import "./index.css";
import RecipeTitle from "./Components/RecipeTitle.js";
import RecipeIngredients from "./Components/RecipeIngredients.js";
import RecipeInstructions from "./Components/RecipeInstructions.js";
import RecipeNutrients from "./Components/RecipeNutrients.js";
import { useSelector } from "react-redux";
import RecipeLikers from "./Components/RecipeLikers.js";

function Recipe() {

    const [recipe, setRecipe] = useState(null)

    const { recipeId } = useParams();

    const { currentUser } = useSelector((state) => state.userReducer);

    const fetchRecipe = async (recipeId) => {
        try {
            const r = await client.findRecipeById(recipeId);
            setRecipe(r);
        } catch (err) {
            console.log("Error in Recipe.js: ")
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRecipe(recipeId);
    }, [recipeId])

    return (
        <div className="m-3 m-md-4">
            {recipe && (
                <div className="container-fluid">
                    <div className="d-none d-sm-block">
                        <div className="row">
                            <div className="col-8">
                                <div className="mb-5">
                                    <RecipeTitle title={recipe.title} author={recipe.author} cuisine={recipe.cuisine} recipeId={recipeId} />
                                </div>
                                <div className="mb-5">
                                    <RecipeIngredients ingredients={recipe.ingredients} />
                                </div>
                                <div className="mb-5">
                                    {currentUser.role !== "USER" && (<RecipeNutrients nutrients={recipe.nutrients} />)}
                                </div>
                                <div className="mb-5">
                                    <RecipeInstructions instructions={recipe.instructions} />
                                </div>
                            </div>
                            <div className="col-4">
                                {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image float-end mb-3" />}
                                <div className="mb-5">
                                    <RecipeLikers recipeid={recipeId} />
                                </div>


                            </div>
                        </div>
                    </div>
                    <div className="d-block d-sm-none">
                        <div className="mb-3">
                            {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image" />}
                        </div>
                        <div className="mb-3">
                            <RecipeTitle title={recipe.title} author={recipe.author.name} cuisine={recipe.cuisine} recipeId={recipeId} />
                        </div>
                        <div className="mb-3">
                            <RecipeIngredients ingredients={recipe.ingredients} />
                        </div>
                        <div className="mb-3">
                            <RecipeNutrients nutrients={recipe.nutrients} />
                        </div>
                        <div className="mb-3">
                            <RecipeInstructions instructions={recipe.instructions} />
                        </div>
                        <div className="mb-3">
                            <RecipeLikers recipeid={recipeId} />
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Recipe;