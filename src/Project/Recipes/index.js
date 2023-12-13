import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client.js";
import "./index.css";
import RecipeTitle from "./RecipeTitle.js";
import RecipeIngredients from "./RecipeIngredients.js";

function Recipe() {
    // const [title, setTitle] = useState(null)
    // const [author, setAuthor] = useState(null)
    // const [cuisine, setCuisine] = useState(null)
    // const [image, setImage] = useState(null)
    // const [ingredients, setIngredients] = useState(null)
    // const [nutrients, setNutrients] = useState(null)
    // const [instructions, setInstructions] = useState(null)
    // const [isVegetarian, setIsVegetarian] = useState(null)
    // const [isGlutenFree, setIsGlutenFree] = useState(null)
    const [recipe, setRecipe] = useState(null)

    const { recipeId } = useParams();

    const fetchRecipe = async (recipeId) => {
        try {
            const r = await client.findRecipeById(recipeId);
            setRecipe(r);
            console.log(r)
            console.log(typeof r)
            console.log(r.title)
            console.log(typeof r.title)
            // const r_title = r.title;
            // const r_author = r.author;
            // const r_cuisine = r.cuisine;
            // const r_image = r.image;
            // const r_ingredients = r.ingredients;
            // const r_nutrients = r.nutrients;
            // const r_instructions = r.instructions;
            // const r_isVegetarian = r.isVegetarian;
            // const r_isGlutenFree = r.isGlutenFree;

            // setTitle(r_title);
            // setAuthor(r_author);
            // setCuisine(r_cuisine);
            // setImage(r_image);
            // setIngredients(r_ingredients);
            // setNutrients(r_nutrients);
            // setInstructions(r_instructions);
            // setIsVegetarian(r_isVegetarian);
            // setIsGlutenFree(r_isGlutenFree);
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
                    <div className="d-none d-md-block">
                        <div className="row">
                            <div className="col-8">
                                <RecipeTitle title={recipe.title} author={recipe.author} cuisine={recipe.cuisine} />
                                <RecipeIngredients ingredients={recipe.ingredients} />
                            </div>
                            <div className="col-4">
                                {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image float-end" />}
                            </div>
                        </div>
                    </div>
                    <div className="d-block d-md-none">
                        {recipe.image && <img src={recipe.image} alt={recipe.title} className="wd-recipe-image" />}
                        <RecipeTitle title={recipe.title} author={recipe.author.name} cuisine={recipe.cuisine} />
                        <RecipeIngredients ingredients={recipe.ingredients} />
                    </div>
                </div>
            )}
        </div>

    )
}

export default Recipe;