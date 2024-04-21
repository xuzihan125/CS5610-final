import { Link, useLocation } from "react-router-dom";
import RecipeCard from '../../Recipes/RecipeCard.js';
import {useEffect, useState} from "react";
import * as recipesClient from "../../Recipes/client";

function RandomRecipes() {
    const [recipe, setRecipe] = useState([]);
    const fetchRecipe = async () => {
        const recipes = await recipesClient.findAllRecipes();
        setRecipe(recipes);
        console.log(recipe)
    }
    // const recipe = { title: "test recipe", image: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2022/07/what_to_know_apples_green_red_1296x728_header-1024x575.jpg", summary: "test summary test summary test summary test summary test summary test summary test summarytest summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary test summary" }

    useEffect(()=>{
        fetchRecipe();
    }, [])

    return (
        <div className="container-fluid">
            <div className=''>
                <h1 className='mb-3'>Not sure what to cook? Check out 10 random recipes for inspiration...</h1>
                <div className='row row-cols-1 row-cols-md-3 row-cols-xl-4 r g-4'>
                    {
                        recipe.length>0 && recipe.map((r, index)=>{
                            return (
                            <div className='col'>
                                <RecipeCard recipe={r} refetchData={fetchRecipe} />
                            </div>
                        )})
                    }
                </div>
            </div>

        </div>
    )
}

export default RandomRecipes;
