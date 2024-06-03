import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTweetContext } from '../tweetContext';

const Layout = () => {
  const { authenticated, setAuthenticated } = useTweetContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setAuthenticated(false);
    navigate('/login'); 
  };

  return (
    <>
      <header>
        <NavLink className='navlink' to='/'>
          Home
        </NavLink>
        {authenticated ? (
          <>
            <NavLink className='navlink' to='/profile'>
              Profile
            </NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink className='navlink' to='/signup'>
              Signup
            </NavLink>
            <NavLink className='navlink' to='/login'>
              Login
            </NavLink>
          </>
        )}
      </header>

      <Outlet />
    </>
  );
};

export default Layout;
