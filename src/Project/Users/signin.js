import * as client from "./client";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from "./reducer";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const signIn = async () => {
        try {
            const credentials = { username: username, password: password };
            const user = await client.signin(credentials);
            dispatch(setCurrentUser(user));
            navigate("/users/account");
        } catch (error) {
            setError(error);
        }
    };
    return (
        <div className="container-fluid">
            <h1>Sign In</h1>
            {error && <div className="alert alert-danger my-1">Incorrect username or password</div>}
            <div className="m-3">
                <div>
                    <label htmlFor="username" className="form-label">
                        Username:
                    </label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Username"
                        value={username}
                        id="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="form-label">
                        Password:
                    </label>
                    <input
                        type="password"
                        className="form-control mb-3"
                        placeholder="Password"
                        value={password}
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button onClick={signIn} className="btn btn-primary">
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default SignIn;