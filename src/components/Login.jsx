import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTweetContext } from '../tweetContext';

const Login = ({ setUsername }) => {
  const navigate = useNavigate();
  const { setAuthenticated } = useTweetContext();
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://655e4d7c9f1e1093c59adfe0.mockapi.io/passwords', {
        method: 'GET',
      });

      if (response.ok) {
        const users = await response.json();

        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
          console.log('User logged in successfully.');
          setUsername(username);
          setAuthenticated(true);
          navigate('/');
        } else {
          console.error('Invalid username or password.');
        }
      } else {
        console.error('Failed to log in.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsernameInput(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
