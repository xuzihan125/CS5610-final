import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as client from './client.js';
import * as followsClient from '../Follows/client.js';

function UserDetail() {

    const [user, setUser] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const { userId } = useParams();
    const { currentUser } = useSelector((state) => state.userReducer);

    const navigate = useNavigate();

    const updateUser = async () => {
        const status = await client.updateUser(userId, user);
    }

    const deleteUser = async () => {
        const status = await client.deleteUser(userId);
        navigate('/users');
    }

    const followUser = async () => {
        const status = await followsClient.userFollowsUser(userId);
        fetchFollowing();
    }

    const unfollowUser = async () => {
        const status = await followsClient.userUnfollowsUser(userId);
        fetchFollowing();
    }

    const fetchFollowers = async () => {
        const f = await followsClient.findFollowersOfUser(userId);
        setFollowers(f);
    }

    const fetchFollowing = async () => {
        const f = await followsClient.findFollowingUsersByUser(userId);
        setFollowing(f);
    }

    const alreadyFollowing = () => {
        return followers.some((follows) => {
            return follows.follower._id === currentUser._id;
        })
    }

    const fetchUser = async () => {
        try {
            const u = await client.findUserById(userId);
            setUser(u);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUser();
        // fetchCurrentUser();
        fetchFollowers();
        fetchFollowing();
    }, [userId, following])

    return (
        <div>
            {currentUser && currentUser._id !== userId && (
                <>
                    {alreadyFollowing() ? (
                        <button onClick={unfollowUser} className="btn btn-danger float-end">
                            Unfollow
                        </button>
                    ) : (
                        <button onClick={followUser} className="btn btn-warning float-end">
                            Follow
                        </button>
                    )}
                </>
            )}
            <h2>User Details</h2>
            {user && (
                <div>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>
                        First Name:
                        <input
                            type="text"
                            className="form-control"
                            value={user.firstName}
                            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        />
                    </p>
                    <p>Last Name: {user.lastName}</p>
                    {currentUser && currentUser.role === 'ADMIN' && (
                        <>
                            <button onClick={updateUser} className="btn btn-primary">
                                Update
                            </button>
                            <button
                                onClick={() => deleteUser(user._id)}
                                className="btn btn-danger"
                            >
                                Delete
                            </button></>
                    )}
                    <h3>Followers</h3>
                    <div className="list-group">
                        {followers.map((follows, index) => (
                            <Link
                                key={index}
                                className="list-group-item"
                                to={`/project/users/${follows.follower._id}`}
                            >
                                {follows.follower.username}
                                {follows.follower._id}
                            </Link>
                        ))}
                    </div>
                    <h3>Following</h3>
                    <div className="list-group">
                        {following.map((follows, index) => (
                            <Link
                                key={index}
                                className="list-group-item"
                                to={`/project/users/${follows.following._id}`}
                            >
                                {follows.following.username}
                                {follows.following._id}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}


export default UserDetail;