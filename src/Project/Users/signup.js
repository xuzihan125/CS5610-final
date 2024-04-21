import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as client from './client';
import {setCurrentUser} from "./reducer";
import {useDispatch} from "react-redux";

function Signup() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
        isVegetarian: false,
        isGlutenIntolerant: false,
        isAdmin: false,
        role: "USER"
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signup = async () => {
        try {
            await client.signup(newUser);
            setError("");
            setSuccess("User created successfully.");
            const user = await client.signin({ username: newUser.username, password: newUser.password });
            dispatch(setCurrentUser(user));
            navigate("/users/account")
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    return (
        <div className='container-fluid'>
            <h1>Sign Up</h1>
            {error && <div className='alert alert-danger my-1'>{error}</div>}
            {success && <div className='alert alert-success my-1'>{success}</div>}
            <div className='m-3'>
                <div className="mb-3">
                    <label htmlFor="userUsername" className="form-label">Username: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={newUser.username}
                        id="userUsername"
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required />
                    <div className='invalid-feedback'>
                        Please enter a unique username.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="userPassword" className="form-label">Password: </label>
                    <input
                        type="password"
                        className="form-control"
                        value={newUser.password}
                        id="userPassword"
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required />
                    <div className='invalid-feedback'>
                        Please enter a password.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="userEmail" className="form-label">Email: </label>
                    <input
                        type="email"
                        className="form-control"
                        value={newUser.email}
                        id="userEmail"
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required />
                    <div className='invalid-feedback'>
                        Please enter a unique email.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="userFirstName" className="form-label">First Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        value={newUser.firstName}
                        id="userFirstName"
                        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                        required
                    />
                    <div className='invalid-feedback'>
                        Please enter your first name.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="userLastName" className="form-label">Last Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="userLastName"
                        value={newUser.lastName}
                        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                        required
                    />
                    <div className='invalid-feedback'>
                        Please enter your last name.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="userBirthday" className="form-label">Birthday: </label>
                    <input
                        type="date"
                        className="form-control"
                        id="userBirthday"
                        value={newUser.birthday}
                        onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })}
                        required
                    />
                    <div className='invalid-feedback'>
                        Please enter your birthday.
                    </div>
                </div>
                <div className="form-check mb-1">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={newUser.isVegetarian}
                        checked={newUser.isVegetarian}
                        id="userIsVegetarian"
                        onChange={(e) =>
                            setNewUser({ ...newUser, isVegetarian: !newUser.isVegetarian })}
                    />
                    <label className="form-check-label" htmlFor="userIsVegetarian">
                        Vegetarian
                    </label>
                </div>
                <div className="form-check mb-1">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        value={newUser.isGlutenIntolerant}
                        checked={newUser.isGlutenIntolerant}
                        id="userIsGlutenIntolerant"
                        onChange={(e) => {
                            setNewUser({ ...newUser, isGlutenIntolerant: newUser.isGlutenIntolerant });
                        }}
                    />
                    <label className="form-check-label" htmlFor="userIsGlutenIntolerant">
                        Gluten Intolerant
                    </label>
                </div>
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        // value={newUser.role==="ADMIN"}
                        checked={newUser.role==="ADMIN"}
                        id="userIsGlutenIntolerant"
                        onChange={(e) => {
                            setNewUser({ ...newUser, role:newUser.role === "ADMIN" ? "USER": "ADMIN" });
                        }}
                    />
                    <label className="form-check-label" htmlFor="userIsGlutenIntolerant">
                        Admin
                    </label>
                </div>
                <button onClick={signup} className="btn btn-primary">
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default Signup;
