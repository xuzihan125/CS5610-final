import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import * as client from "./client.js";

function UserSearch() {

    const urlSearchTerm = useParams().searchTerm;
    const [searchTerm, setSearchTerm] = useState(urlSearchTerm || "test");
    const [results, setResults] = useState(null);
    const navigate = useNavigate();

    const fetchUsers = async (urlSearchTerm) => {
        const results = await client.findUsersBySearchTerm(urlSearchTerm);
        setResults(results);
        setSearchTerm(urlSearchTerm);
    }

    useEffect(() => {
        if (urlSearchTerm) {
            fetchUsers(urlSearchTerm);
        }
    }, [urlSearchTerm])

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
                <ul className="list-group">
                    {results && results.map((user, index) => (
                        <li key={index}
                            className="list-group-item">
                            <Link to={`/users/${user._id}`}>
                                <h3>{user.username}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default UserSearch;