import { useSelector } from "react-redux";
import * as likesClient from "../Likes/client.js";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RecipeCard from "../Recipes/RecipeCard";

function Likes() {

    const { currentUser } = useSelector((state) => state.userReducer);
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        const r = await likesClient.findRecipesLikedByUser(currentUser._id);
        setRecipes(r);
        console.log(r);
    }

    useEffect(() => {
        fetchRecipes();
    }, [recipes])



    return (
        <div className="container-fluid">
            <h1>Liked Recipes</h1>
            {currentUser && recipes && (
                <div className=''>
                    <div className='row row-cols-1 row-cols-md-3 row-cols-xl-4 r g-4'>
                        {
                            recipes.length>0 && recipes.map((r, index)=>{
                                return (
                                    <div className='col'>
                                        <RecipeCard recipe={r.recipe} />
                                    </div>
                                )})
                        }
                    </div>
                </div>
            )}
        </div>
    )
}

export default Likes;
