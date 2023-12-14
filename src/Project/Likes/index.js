import { useSelector } from "react-redux";
import * as likesClient from "../Likes/client.js";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

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
                <>
                    <ul>
                        {recipes.map((likes) => {
                            return (
                                <li key={likes.recipe._id}>
                                    <Link to={`/recipes/${likes.recipe._id}`}>
                                        {likes.recipe.title}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}

export default Likes;