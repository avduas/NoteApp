import React from 'react';
import { useTweetContext } from './tweetContext';

const TweetCount = () => {
  const { tweets } = useTweetContext();

  return (
    <div>
      Tweet Count: {tweets.length}
    </div>
  );
}

export default TweetCount;
