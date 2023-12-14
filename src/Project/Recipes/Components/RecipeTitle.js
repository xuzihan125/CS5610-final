import { useSelector } from "react-redux";
import * as likesClient from "../../Likes/client.js";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function RecipeTitle({ recipeId, title, author, cuisine }) {

    const { currentUser } = useSelector((state) => state.userReducer);
    const [likers, setLikers] = useState([]);
    const [quota, setQuota] = useState(true);

    const likeRecipe = async () => {
        const status = await likesClient.userLikesRecipe(recipeId);
        fetchLikers();
    }

    const unlikeRecipe = async () => {
        const status = await likesClient.userUnlikesRecipe(recipeId);
        fetchLikers();
    }

    const fetchLikers = async () => {
        const l = await likesClient.findUsersLikingRecipe(recipeId);
        setLikers(l);
    }

    const alreadyLiking = () => {
        return likers.some((likes) => {
            return likes.user._id === currentUser._id;
        })
    }

    useEffect(() => {
        fetchLikers();
    }, [likers])

    return (
        <div>
            <div className="mb-4 row">
                <div className="col-9">
                    <h1>{title}</h1>
                </div>
                <div className="col-3">
                    {currentUser && (
                        <>
                            {alreadyLiking() ? (
                                <button className="btn btn-danger float-end" onClick={unlikeRecipe}>Unlike</button>
                            ) : (<button className="btn btn-warning float-end" onClick={likeRecipe}>Like</button>)}
                        </>
                    )}
                </div>
            </div>
            <div className="mb-3">
                {author && <h5> By {author.username} </h5>}
                {cuisine && <h5> Cuisine: {cuisine} </h5>}
            </div>
        </div>
    )
}

export default RecipeTitle;