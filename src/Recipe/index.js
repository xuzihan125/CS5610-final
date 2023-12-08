import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";
import "./index.css";
import RecipeTitle from "./RecipeTitle";

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
    }, [])

    return (
        <div className="m-3 m-sm-4">
            <div className="container-fluid">
                <div className="d-none d-sm-block">
                    <div className="row">
                        <div className="col-8">
                            <RecipeTitle recipe={recipe} />
                            <h3>Ingredients:</h3>
                            <ul>
                                {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.ingredient.name}
                                        <br></br>
                                        {ingredient.unit}
                                    </li>
                                ))}
                            </ul>


                        </div>
                        <div className="col-4">
                            {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image float-end" />}
                        </div>
                    </div>
                </div>
                <div className="d-block d-sm-none">
                    {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image" />}
                    <h1>{recipe.title}</h1>
                    {recipe.author && <h3> By {recipe.author} </h3>}
                </div>


            </div>
        </div>

    )
}

export default Recipe;