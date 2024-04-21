import RecipeCard from '../../Recipes/RecipeCard.js';
import {useEffect, useState} from "react";
import * as recipesClient from "../../Recipes/client";

function RandomRecipes() {
    const [recipe, setRecipe] = useState([]);
    const fetchRecipe = async () => {
        const recipes = await recipesClient.findAllRecipes();
        setRecipe(recipes);
    }

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
