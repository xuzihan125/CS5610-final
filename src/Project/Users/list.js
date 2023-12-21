import * as client from "./client";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function UserList() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [user, setUser] = useState({
        username: "",
        password: "",
        firstName: "John",
        lastName: "Appleseed",
        email: "john.appleseed@apple.com",
        birthday: "1955-02-24",
        isVegetarian: false,
        isGlutenIntolerant: false,
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchCurrentUser = async () => {
        const user = await client.account();
        setCurrentUser(user);
    }

    const fetchUser = async (userId) => {
        const u = await client.findUserById(userId);
        setUser(u);
    }

    const fetchUsers = async () => {
        const users = await client.findAllUsers();
        setUsers(users);
    }

    const deleteUser = async (userId) => {
        const status = await client.deleteUser(userId);
        setSuccess("User deleted successfully.");
        fetchUsers();
    }

    const updateUser = async () => {
        try {
            const status = await client.updateUser(user._id, user);
            setSuccess("User information updated successfully.")
            setError("");
        } catch (error) {
            setError(error.response.data.message);
        }
    }

    const createUser = async () => {
        try {
            const status = await client.createUser(user);
            setSuccess("User created successfully.")
            setError("");
        } catch (error) {
            setError(error.response.data.message);

        }
    }

    useEffect(() => {
        fetchCurrentUser();
        fetchUsers();
    }, [])

    return (
        <div className="container-fluid">
            {currentUser && currentUser.role === "ADMIN" && (
                <>
                    <h1>Users</h1>
                    {error && <div className='alert alert-danger my-1'>{error}</div>}
                    {success && <div className='alert alert-success my-1'>{success}</div>}
                    <div>
                        <div className="mb-3">
                            <label htmlFor="userUsername" className="form-label">Username: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={user.username}
                                id="userUsername"
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
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
                                value={user.password}
                                id="userPassword"
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
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
                                value={user.email}
                                id="userEmail"
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                                value={user.firstName}
                                id="userFirstName"
                                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
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
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
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
                                value={user.birthday}
                                onChange={(e) => setUser({ ...user, birthday: e.target.value })}
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
                                value={user.isVegetarian}
                                checked={user.isVegetarian}
                                id="userIsVegetarian"
                                onChange={(e) =>
                                    setUser({ ...user, isVegetarian: e.target.checked })}
                            />
                            <label className="form-check-label" htmlFor="userIsVegetarian">
                                Vegetarian
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
                                    setUser({ ...user, v: e.target.checked });
                                }}
                            />
                            <label className="form-check-label" htmlFor="userIsGlutenIntolerant">
                                Gluten Intolerant
                            </label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userRole" className="form-label">Role: </label>
                            <select
                                className="form-select"
                                id="userRole"
                                value={user.role}
                                onChange={(e) => setUser({ ...user, role: e.target.value })}
                                required>
                                <option value="USER">User</option>
                                <option value="PREMIUM USER">Premium User</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <button className="btn btn-primary mb-3 me-3" onClick={updateUser}>Update</button>
                        <button className="btn btn-success mb-3" onClick={createUser}>Create</button>
                    </div>

                    <h2>All Users</h2>
                    <div className="list-group">
                        {users.filter((user) => user._id !== currentUser._id).map((user) => (
                            <div className="list-group-item d-flex align-items-center justify-content-between">
                                <Link
                                    key={user._id}
                                    to={`/users/${user._id}`}>
                                    {user.username}
                                </Link>
                                <div>
                                    <button className="btn btn-danger float-end" onClick={() => deleteUser(user._id)}>Delete</button>
                                    <button className="btn btn-warning float-end mx-2" onClick={() => fetchUser(user._id)}>Edit</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
            {currentUser && currentUser.role !== "ADMIN" && (
                <Navigate to="/signin" />
            )}
        </div>
    )
}

export default UserList;