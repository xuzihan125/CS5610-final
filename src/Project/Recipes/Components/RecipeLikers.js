import { useSelector } from "react-redux";
import * as likesClient from "../../Likes/client.js";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


function RecipeLikers({ recipeid }) {

    const { currentUser } = useSelector((state) => state.userReducer);
    const [likers, setLikers] = useState([]);

    const fetchLikers = async () => {
        const l = await likesClient.findUsersLikingRecipe(recipeid);
        setLikers(l);
    }

    useEffect(() => {
        fetchLikers();
    }, [likers])

    return (
        <div>
            <h5>Users who like this recipe:</h5>
            {currentUser && (
                <>
                    <ul>
                        {likers.map((likes) => {
                            return (
                                <li key={likes.user._id}>
                                    <Link to={`/users/${likes.user._id}`}>
                                        {likes.user.username}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </>
            )}
        </div>
    )
}

export default RecipeLikers;
