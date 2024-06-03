import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTweetContext } from '../tweetContext';

const SignUp = ({ setUsername }) => {
  const navigate = useNavigate();
  const { setAuthenticated } = useTweetContext();
  const [username, setUsernameInput] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://655e4d7c9f1e1093c59adfe0.mockapi.io/passwords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log('User registered successfully.');
        setUsername(username); 
        setAuthenticated(true); 
        navigate('/'); 
      } else {
        console.error('Failed to register user.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsernameInput(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
