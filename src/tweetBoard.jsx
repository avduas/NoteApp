import React, { useEffect, useState, useRef } from 'react';
import './tweetBoard.css';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useTweetContext } from './tweetContext';
import { useNavigate } from 'react-router-dom';

const TweetList = ({ username }) => {
    const { tweets, addTweet, authenticated } = useTweetContext();
    const [tweet, setTweet] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [charCountWarning, setCharCountWarning] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authenticated) {
            navigate('/login');
            console.log('User is not authenticated. Redirecting...');
        }
    }, [authenticated]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(handleObserver, options);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    useEffect(() => {
        if (page > 1 && loaderRef.current) {
            setIsLoading(true);
            fetchTweets();
        }
    }, [page]);

    const handleObserver = (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoading) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    const fetchTweets = async () => {
        try {
            const url = new URL('https://655e4d7c9f1e1093c59adfe0.mockapi.io/users');
            url.searchParams.append('page', page);
            url.searchParams.append('limit', 10);

            const response = await fetch(url.toString());
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.length === 0) {
                setHasMore(false);
            }

            data.forEach((tweet) => {
                const newTweet = {
                    id: tweet.id,
                    text: tweet.text,
                    author: tweet.author,
                    timestamp: tweet.timestamp,
                };

                addTweet(newTweet);
            });

        } catch (error) {
            console.error('Error fetching tweets:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        try {
            setIsLoading(true);

            if (tweet && tweet.trim() !== '') {
                const newTweet = {
                    id: Date.now(),
                    text: tweet,
                    author: username,
                    timestamp: new Date().toLocaleString(),
                };

                addTweet(newTweet);

                setTweet('');
                setCharCountWarning('');
            }
        } catch (error) {
            console.error('Error adding tweet:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTweetChange = (e) => {
        const newTweet = e.target.value;
        setTweet(newTweet);
        if (newTweet.trim().length > 140) {
            setIsButtonDisabled(true);
            setCharCountWarning('The tweet can\'t contain more than 140 characters.');
        } else {
            setIsButtonDisabled(false);
            setCharCountWarning('');
        }
    };

    return (
        <div className='tweetArea'>
            <div className="textareaTweet">
                <textarea value={tweet} onChange={handleTweetChange} placeholder='What is on your mind?'></textarea>
                {charCountWarning && <div className="charCountWarning">{charCountWarning}</div>}
                <button onClick={handleSubmit} disabled={isButtonDisabled || isLoading}>Tweet</button>
            </div>

            <div className="boardTweets">
                {tweets.map((savedTweet) => (
                    <div className='savedTweet' key={savedTweet.timestamp}>
                        <div className='title'>
                            <div>{savedTweet.author}</div>
                            <div>{savedTweet.timestamp}</div>
                        </div>
                        <div className='textTweet'>
                            {typeof savedTweet.text === 'string' && savedTweet.text.split('\n').map((line, lineIndex) => (
                                <React.Fragment key={lineIndex}>
                                    {line}
                                    <br />
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isLoading && (
                <>
                    <Spinner animation="border" variant="light" />
                    <div className='loading'>Loading...</div>
                </>
            )}

            <div ref={loaderRef}></div>

        </div>
    );
}

export default TweetList;
