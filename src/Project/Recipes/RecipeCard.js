import './RecipeCard.css';
import * as helper from '../Helper';
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import * as recipesClient from "./client";
import React from "react";
import axios from "axios";

function RecipeCard({ recipe, refetchData }) {
    const { currentUser } = useSelector((state) => state.userReducer);

    const deleteRecipe = async () =>{
        const recipes = await recipesClient.deleteRecipe(recipe._id);
        refetchData();
    }

    return (
        <div className="card h-100">
            <img src={recipe.image} className="card-img-top" alt={recipe.title} />
            <div className="card-body">
                <h5 className='card-title'>
                    {recipe.title}
                </h5>
                <p className='card-text'>
                    {helper.trimString(recipe.instructions, 100)}
                </p>
                <div className="mb-3">
                    <Link to={`/recipes/${recipe._id}`} className="btn btn-success">View Recipe</Link>
                </div>
                {currentUser.role === "ADMIN" &&
                    <button className="btn btn-outline-danger" onClick={() => deleteRecipe()}>delete Recipes</button>}
            </div>
        </div>
    )
}

export default RecipeCard;
