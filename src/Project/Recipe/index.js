import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client.js";
import "./index.css";
import RecipeTitle from "./RecipeTitle.js";
import RecipeIngredients from "./RecipeIngredients.js";

function Recipe() {
    const [recipe, setRecipe] = useState({
        title: "",
        image: "",
        author: "",
        cuisine: "Other",
        ingredients: [],
        instructions: []
    })

    const { recipeId } = useParams();

    const selectRecipe = async (recipeId) => {
        try {
            const r = await client.findRecipeById(recipeId);
            setRecipe(r);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        selectRecipe(recipeId);
    }, [recipeId])

    return (
        <div className="m-3 m-md-4">
            <div className="container-fluid">
                <div className="d-none d-md-block">
                    <div className="row">
                        <div className="col-8">
                            <RecipeTitle recipe={recipe} />
                            <RecipeIngredients recipe={recipe} />
                        </div>
                        <div className="col-4">
                            {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image float-end" />}
                        </div>
                    </div>
                </div>
                <div className="d-block d-md-none">
                    {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image" />}
                    <RecipeTitle recipe={recipe} />
                    <RecipeIngredients recipe={recipe} />
                </div>


            </div>
        </div>

    )
}

export default Recipe;