import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client.js";

function UserSearch() {

    const urlSearchTerm = useParams().searchTerm;
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm || "test");
    const [results, setResults] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const fetchUsers = async (urlSearchTerm) => {
        const results = await client.findUsersBySearchTerm(urlSearchTerm);
        setResults(results);
        setSearchTerm(urlSearchTerm);
    }

    const fetchUser = async () => {
        const currentUser = await client.account();
        setUser(currentUser);
    }

    useEffect(() => {
        if (urlSearchTerm) {
            fetchUsers(urlSearchTerm);
        }
        if (!user) {
            fetchUser();
        }
    }, [urlSearchTerm, user])

    return (
        <div>
            <div className="d-flex mx-5 my-3" role="search">
                <input className="form-control me-2" type="text"
                    placeholder="Search for users by username"
                    value={searchTerm}
                    onChange={(event) => {
                        setSearchTerm(event.target.value);
                    }} />
                <button className="btn btn-outline-success" onClick={() => navigate(`/users/search/${searchTerm}`)}>Search Users</button>
            </div>

            <div>
                <h2>Search Results for "{searchTerm}"</h2>
                {!user && (<div className="alert alert-danger my-1">Please <Link to={"/users/signin"}>click here</Link> to sign in first.</div>)}
                {user && (
                    <ul className="list-group">
                        {results && results.map((user, index) => (
                            <li key={index}
                                className="list-group-item">
                                <Link to={`/users/${user._id}`}>
                                    <h4>{user.username}</h4>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default UserSearch;
