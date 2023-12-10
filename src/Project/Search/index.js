import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as client from "../Client";

function Search() {
    const urlSearchTerm = useParams().searchTerm;
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm || "Apple");
    const [results, setResults] = useState(null);
    const navigate = useNavigate();

    const fetchRecipes = async (urlSearchTerm) => {
        const results = await client.findRecipes(urlSearchTerm);
        setResults(results);
        setSearchTerm(urlSearchTerm);
    }

    useEffect(() => {
        if (urlSearchTerm) {
            fetchRecipes(urlSearchTerm);
        }
    }, [urlSearchTerm]);

    return (
        <div>
            <div className="d-flex mx-5 my-3" role="search">
                <input className="form-control me-2" type="text" placeholder="Recipes, ingredients, ..." aria-label="Search" value={searchTerm} onChange={(event) => {
                    setSearchTerm(event.target.value);
                }} />
                <button className="btn btn-outline-success" onClick={() => navigate(`/search/${searchTerm}`)}>Search</button>
            </div>
            <div>
                <h2>Search Results for "{searchTerm}"</h2>
                {/* <pre>{JSON.stringify(results, null, 2)}</pre> */}
                <ul className="list-group">
                    {results && results.map((recipe, index) => (
                        <li key={index} className="list-group-item">
                            <Link to={`/details/${recipe.id}`}>
                                <h3>{recipe.title}</h3>
                                <img src={recipe.image} alt={recipe.title} className="float-end" />
                            </Link>
                        </li>
                    ))}
                </ul>

            </div>
        </div>

    )
}

export default Search;