import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as client from './client';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

function UserDetail() {

    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const currentUser = useSelector((state) => state.currentUser);

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
    }, [userId])

    return (
        <div>
            {user && (
                <h1>{user.username}</h1>

            )}
        </div>
    )
}

export default UserDetail;