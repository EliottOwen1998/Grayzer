import React, { useState, useEffect } from 'react';

async function fetchRedditData() {
    const apiUrl = 'https://www.reddit.com/r/popular.json';

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Check for rate limit errors (HTTP status code 429)
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please wait and try again later.');
            } else {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
        }

        const data = await response.json();
        return data.data.children.map(post => ({
            title: post.data.title,
            url: post.data.url,
            author: post.data.author,
            upvotes: post.data.ups
        }));
    } catch (error) {
        console.error('Error fetching Reddit data:', error.message);
        return { error: error.message }; // Return error to handle in the UI
    }
}

const RedditPosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPosts = async () => {
            const fetchedData = await fetchRedditData();
            if (fetchedData.error) {
                setError(fetchedData.error);
            } else {
                setPosts(fetchedData);
            }
        };
        loadPosts();
    }, []);

    return (
        <div>
            {error ? (
                <div className="error-message">{error}</div>
            ) : (
                posts.map((post, index) => (
                    <div key={index} className="reddit-post">
                        <h3>{post.title}</h3>
                        <p>Author: {post.author}</p>
                        <a href={post.url} target="_blank" rel="noopener noreferrer">View Post</a>
                        <span>Upvotes: {post.upvotes}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default RedditPosts;
