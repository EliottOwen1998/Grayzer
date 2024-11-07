// Main.js
import React, { useState, useEffect } from 'react';
import Post from './components/posts/post';
import Sidebar from './sidebar/sideBar';
import fetchRedditPosts from './api/redditApi';
import defaultPosts from './fakeData/fakeDate';

const Main = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [redditPosts, setRedditPosts] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostMedia, setNewPostMedia] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRedditPosts = async () => {
            try {
                const posts = await fetchRedditPosts();
                setRedditPosts(posts);
            } catch (err) {
                setError('Failed to load Reddit posts. Please try again later.');
                console.error('Reddit API error:', err);
            }
        };

        loadRedditPosts();
    }, []);

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title: newPostTitle,
            content: newPostContent,
            media: newPostMedia,
            votes: 0
        };
        setUserPosts([...userPosts, newPost]);
        setNewPostTitle('');
        setNewPostContent('');
        setNewPostMedia(null);
    };

    return (
        <main className="grid-container">
            <Sidebar />

            <section className="content card">
                <h2>Posts</h2>

                {error && <p className="error">{error}</p>}

                {defaultPosts.map((post, index) => (
                    <Post 
                        key={index} 
                        title={post.title} 
                        content={post.content} 
                        votes={post.votes} 
                        media={post.media}
                    />
                ))}

                {redditPosts.map((post, index) => (
                    <Post 
                        key={`reddit-${index}`} 
                        title={post.title} 
                        content={post.content} 
                        votes={post.votes} 
                        media={post.media}
                    />
                ))}

                {userPosts.map((post, index) => (
                    <Post 
                        key={`user-${index}`} 
                        title={post.title} 
                        content={post.content} 
                        votes={post.votes} 
                        media={post.media}
                    />
                ))}
                
                <form onSubmit={handlePostSubmit}>
                    <input
                        type="text"
                        placeholder="Post Title"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Post Content"
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => setNewPostMedia(URL.createObjectURL(e.target.files[0]))}
                    />
                    <button type="submit">Submit Post</button>
                </form>
            </section>

            <aside className="advertisements card">
                <div className="ad">Advertisement 1</div>
                <div className="ad">Advertisement 2</div>
            </aside>
        </main>
    );
};

export default Main;
