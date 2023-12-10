import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

function Account() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const user = await client.account();
            setUser(user);
        } catch (err) {
            navigate("/signin");
        }
    }

    const updateUser = async () => {
        try {
            const status = await client.updateUser(user._id, user);
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const signout = async () => {
        const status = await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/home");
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return (
        <div className="container-fluid">
            <h1>Account</h1>
            {user && (
                <div>
                    <h3>Welcome, {user.username}</h3>
                    {error && <div className="alert alert-danger my-1">{error}</div>}
                    <div className="m-3">
                        <div className="mb-3">
                            <label htmlFor="userUsername" className="form-label">Username: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={user.username}
                                id="userUsername"
                                onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userEmail" className="form-label">Email: </label>
                            <input
                                type="email"
                                className="form-control"
                                value={user.email}
                                id="userEmail"
                                onChange={(e) => setUser({ ...user, email: e.target.value })} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userFirstName" className="form-label">First Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={user.firstName}
                                id="userFirstName"
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userLastName" className="form-label">Last Name: </label>
                            <input
                                type="text"
                                className="form-control"
                                id="userLastName"
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userBirthday" className="form-label">Birthday: </label>
                            <input
                                type="date"
                                className="form-control"
                                id="userBirthday"
                                value={user.birthday}
                                onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                            />
                        </div>
                        <div className="form-check mb-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={user.isVegetarian}
                                checked={user.isVegetarian}
                                id="userIsVegetarian"
                                onChange={(e) => {
                                    setUser({ ...user, isVegetarian: e.target.checked });
                                }} />
                            <label className="form-check-label" htmlFor="userIsVegetarian">
                                Vegetarian
                            </label>
                        </div>
                        <div className="form-check mb-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={user.isVegan}
                                checked={user.isVegan}
                                id="userIsVegan"
                                onChange={(e) => {
                                    setUser({ ...user, isVegan: e.target.checked });
                                }} />
                            <label className="form-check-label" htmlFor="userIsVegan">
                                Vegan
                            </label>
                        </div>
                        <div className="form-check mb-1">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={user.isLactoseIntolerant}
                                checked={user.isLactoseIntolerant}
                                id="userIsLactoseIntolerant"
                                onChange={(e) => {
                                    setUser({ ...user, isLactoseIntolerant: e.target.checked });
                                }} />
                            <label className="form-check-label" htmlFor="userIsLactoseIntolerant">
                                Lactose Intolerant
                            </label>
                        </div>
                        <div className="form-check mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={user.isGlutenIntolerant}
                                checked={user.isGlutenIntolerant}
                                id="userIsGlutenIntolerant"
                                onChange={(e) => {
                                    setUser({ ...user, isGlutenIntolerant: e.target.checked });
                                }}
                            />
                            <label className="form-check-label" htmlFor="userIsGlutenIntolerant">
                                Gluten Intolerant
                            </label>
                        </div>

                        <button onClick={updateUser} className="btn btn-primary me-3">
                            Update
                        </button>
                        <button onClick={signout} className="btn btn-danger">
                            Sign Out
                        </button>
                        {user.role === "ADMIN" && (
                            <Link to="/users" className="btn btn-warning">
                                Users
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Account;