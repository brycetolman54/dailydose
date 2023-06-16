import React from 'react';

import {NavLink} from 'react-router-dom';

import './feed.css';

import {Post} from './post';

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
                setAllPosts(thePosts);
                localStorage.setItem('feedPosts', JSON.stringify(thePosts));
            })
            .catch(() => {
                const postText = localStorage.getItem('feedPosts');
                if(postText) {
                    setAllPosts(JSON.parse(postText));
                }
            });
    }, []);

    const [likes, setLikes] = React.useState([]);

    React.useEffect(() => {
        fetch(`/api/feed/${localStorage.getItem('username')}`)
            .then(response => response.json())
            .then(data => {
                setLikes(data);
                localStorage.setItem('myLikes', JSON.stringify(data));
            })
            .catch(() => {
                const likesText = localStorage.getItem('myLikes');
                if(likesText) {
                    setLikes(JSON.parse(likesText));
                }
            });
    }, []);

    const handleClick = (id) => {

    }

    const postsArray = [];
    if(allPosts.length) {
        for(const [i, post] of allPosts.entries()) {
            const liked = likes.includes(post.place);
            const date = getDate(new Date(post.time));
            const time = getTime(new Date(post.time));
            postsArray.push(
                <Post key={post.place} id={allPosts.length - post.place - 1} title={post.title} content={post.content} user={post.user} time={time} date={date} handleClick={handleClick} liked={liked}/>
            );
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

export function getDate(time) {
    let value = '';
    let month = time.getMonth() + 1;
    value += month;
    value += '/';
    value += time.getDate();
    value += '/';
    value += time.getFullYear();
    return value;
}

export function getTime(time) {
    let bool = false;
    let value = '';
    let hour = time.getHours();
    if(hour > 12) {
        hour = hour - 12;
        value += hour;
        bool = true;
    }
    else {
        value += hour;
    }
    value += ':';
    if(time.getMinutes() < 10) {
        value += 0;
    }
    value += time.getMinutes();
    value += ' ';
    if(bool) {
        value += 'pm';
    }
    else {
        value += 'am';
    }
    return value;
}