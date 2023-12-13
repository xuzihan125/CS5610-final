import Home from './Home';
import Search from './Search';
import Signup from './Users/signup';
import Signin from './Users/signin';
import CurrentUser from './Users/currentUser';
import Likes from './Likes';
import Recipe from './Recipe';
import Account from './Users/account';
import UserDetails from './Users/details';
import Navigation from './Navigation';
import UserSearch from './Users/search';
import UserList from './Users/list';
import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { useState } from 'react';

function Project() {

    const [key, setKey] = useState('home');

    return (
        <Provider store={store}>
            <CurrentUser>
                <div className='d-flex flex-column'>
                    <Navigation />
                    <div className='flex-grow-1' style={{ paddingTop: '56px' }}>
                        <Routes>
                            <Route path="/" element={<Navigate to="home" />} />
                            <Route path="home" element={<Home />} />
                            <Route path="search" element={<Search />} />
                            <Route path="users/signin" element={<Signin />} />
                            <Route path="users/signup" element={<Signup />} />
                            <Route path="likes/:userId" element={<Likes />} />
                            <Route path="likes" element={<Likes />} />
                            <Route path="users/account" element={<Account />} />
                            <Route path="search/:searchTerm" element={<Search />} />
                            <Route path="recipes/:recipeId" element={<Recipe />} />
                            <Route path="users/search" element={<UserSearch />} />
                            <Route path="users/search/:searchTerm" element={<UserSearch />} />
                            <Route path='users/:userId' element={<UserDetails />} />
                            <Route path='users' element={<UserList />} />
                        </Routes>
                    </div>
                </div>
            </CurrentUser>
        </Provider>

    )
}

export default Project;