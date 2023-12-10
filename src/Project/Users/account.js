import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

function Account() {
    const [user, setUser] = useState(null);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isLactoseIntolerant, setIsLactoseIntolerant] = useState(false);
    const [isGlutenIntolerant, setIsGlutenIntolerant] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchUser = async () => {
        try {
            const user = await client.account();
            setUser(user);
            setIsVegan(user.isVegan);
            setIsVegetarian(user.isVegetarian);
            setIsLactoseIntolerant(user.isLactoseIntolerant);
            setIsGlutenIntolerant(user.isGlutenIntolerant);
        } catch (err) {
            navigate("/signin");
        }
    }

    const updateUser = async () => {
        const status = await client.updateUser(user._id, user);
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
        <div>
            <h1>Account</h1>
            {user && (
                <div>
                    <h3>Welcome, {user.username}</h3>
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
                            value={isVegetarian}
                            checked={isVegetarian}
                            id="userIsVegetarian"
                            onChange={(e) => {
                                setIsVegetarian(e.target.checked);
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
                            value={isVegan}
                            checked={isVegan}
                            id="userIsVegan"
                            onChange={(e) => {
                                setIsVegan(e.target.checked);
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
                            value={isLactoseIntolerant}
                            checked={isLactoseIntolerant}
                            id="userIsLactoseIntolerant"
                            onChange={(e) => {
                                setIsLactoseIntolerant(e.target.checked);
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
                            value={isGlutenIntolerant}
                            checked={isGlutenIntolerant}
                            id="userIsGlutenIntolerant"
                            onChange={(e) => {
                                setIsGlutenIntolerant(e.target.checked);
                                setUser({ ...user, v: e.target.checked });
                            }}
                        />
                        <label className="form-check-label" htmlFor="userIsGlutenIntolerant">
                            Gluten Intolerant
                        </label>
                    </div>



                    <button onClick={updateUser} className="btn btn-primary">
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
            )
            }
        </div>
    )
}

export default Account;