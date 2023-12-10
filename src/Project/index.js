import Home from './Home';
import Search from './Search';
import Signup from './Users/signup';
import Signin from './Users/signin';
import Bookmarks from './Bookmarks';
import Recipe from './Recipe';
import Account from './Users/account';
import Navigation from './Navigation';
import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CurrentUser from './Users/currentUser';
import { useState } from 'react';

function Project() {

    const [key, setKey] = useState('home');

    return (
        <Provider store={store}>
            <div className='d-flex flex-column'>
                <Navigation />
                <div className='flex-grow-1' style={{ paddingTop: '56px' }}>
                    <Routes>
                        <Route path="/" element={<Navigate to="home" />} />
                        <Route path="home" element={<Home />} />
                        <Route path="search" element={<Search />} />
                        <Route path="users/signin" element={<Signin />} />
                        <Route path="users/signup" element={<Signup />} />
                        <Route path="bookmarks/:userId" element={<Bookmarks />} />
                        <Route path="users/account" element={<Account />} />
                        <Route path="search/:searchTerm" element={<Search />} />
                        <Route path="recipes/:recipeId" element={<Recipe />} />
                    </Routes>
                </div>
            </div>
        </Provider>

    )
}

export default Project;