import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TweetList from './tweetBoard';
import UserProfile from './profile';
import Layout from './components/Layout';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { TweetProvider } from './tweetContext';


function App() {
  const [username, setUsername] = useState('');

  return (
    <TweetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<TweetList username={username} />} />
          <Route path="/profile" element={<UserProfile setUsername={setUsername} />} />
        <Route path="/signup" element={<SignUp setUsername={setUsername} />} />
        <Route path="/login" element={<Login setUsername={setUsername} />} />
        </Route>
      </Routes>
    </TweetProvider>
  );
}

export default App;
