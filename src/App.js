import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router';
import { useState } from 'react';
import Home from './Home';
import Search from './Search';
import Login from './Users/login';
import Signup from './Users/signup';
import Bookmarks from './Bookmarks';
import Recipe from './Recipe';
import Profile from './Users/profile';
import Navigation from './Navigation';
import { StateProvider } from './StateProvider';

function App() {
  const [key, setKey] = useState("home");

  return (
    <HashRouter>
      <StateProvider>
        <div className='d-flex flex-column'>
          <Navigation />
          <div className='flex-grow-1' style={{ paddingTop: '56px' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/bookmarks/:userId" element={<Bookmarks />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/details/:recipeId" element={<Recipe />} />
            </Routes>
          </div>
        </div>
      </StateProvider>
    </HashRouter>
  );
}

export default App;
