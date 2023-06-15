import React from 'react';

import {NavLink} from 'react-router-dom';

import './feed.css';

export function Feed() {

    const [author, setAuthor] = React.useState('');
    const [quote, setQuote] = React.useState('');

    React.useEffect(() => {
        fetch('https://api.quotable.io/random')
            .then((response) => response.json())
            .then((data) => {
            setQuote(data.content);
            setAuthor(data.author);
            });
    }, []);

    const [allPosts, setAllPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/feed/posts')
            .then(response => response.json())
            .then(thePosts => {
                localStorage.setItem('feedPosts', JSON.stringify(thePosts));
            })
            .catch(() => {
                const postText = localStorage.getItem('feedPosts');
                if(postText) {
                    setAllPosts(JSON.parse(postText));
                }
            });
    }, [allPosts]);

    const postsArray = [];
    if(postsArray.length) {
        for(const [i, post] of postsArray) {

        }
    }


    return (
        <main>
        <div id="topHeader">
            <NavLink id="bars" to='../feedNoTop'>&#x2630;</NavLink>
            <h2>Feed</h2>
            {/* <div id="userInfo" onclick='backToLogin()'>Login</div> */}
        </div>
        <div id="feedAndQuote">
            <div id="quoteAndNew">
                <aside id="quote">
                    <h3 id="quoteTitle">Inspirational Quote</h3>
                    <p id="thequote">{quote}</p>
                    <p id="author">{author}</p>
                </aside>
                <div id="newpost">
                    <p id="newPostHead"><b>New Post</b></p>
                    <label htmlFor="text">Post title</label>
                    {/* <input type="text" id="postTitle" name="postTitle" placeholder="Enter a title (max 60 characters)" pattern=".{1,50}" title="Your title is too long" required oninput="enablePost()"/> */}
                    <label htmlFor="textarea">Post text</label>
                    {/* <textarea id="postContent" name="newPost" placeholder="Share your thoughts" required oninput="enablePost()"></textarea> */}
                    {/* <button id="postIt" disabled onclick="addPost()">Post</button> */}
                </div>
            </div>
            <div id="feedfield">{postsArray}</div>
        </div>
        </main>
    );
    
} 
