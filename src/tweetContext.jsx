import React, { createContext, useContext, useState } from 'react';

const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
    const [tweets, setTweets] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    const addTweet = (tweetToAdd) => {
        setTweets((prevTweets) => {
            const updatedTweets = [...prevTweets, tweetToAdd];

            updatedTweets.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

            const uniqueTweets = updatedTweets.filter((tweet, index, self) =>
                index === self.findIndex((t) => t.text === tweet.text)
            );

            return uniqueTweets;
        });
    };

    return (
        <TweetContext.Provider value={{ tweets, addTweet, authenticated, setAuthenticated }}>
            {children}
        </TweetContext.Provider>
    );
};

export const useTweetContext = () => {
    return useContext(TweetContext);
};
