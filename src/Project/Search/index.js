import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import * as recipesClient from "../Recipes/client.js";
import RecipeCard from "../Recipes/RecipeCard";


function Search() {
    const urlSearchTerm = useParams().searchTerm;
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm || "Apple");
    const [recipes, setRecipes] = useState(null);
    const navigate = useNavigate();

    const fetchRecipes = async () => {
        const result = await recipesClient.findRecipesBySearchTerm(urlSearchTerm);
        setRecipes(result);
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
