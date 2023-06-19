import React from 'react';

import {NavLink} from 'react-router-dom';

import './feed.css';

import {Post} from './post';

export function Feed(props) {

    React.useEffect(() => {

        checkUser();
        
    }, [props.username]);

    async function checkUser() {

        if(props.username) {
            if(await getAuthen(props.username)) {
                // Do nothing
            }
            else {
                props.Logout();          
            }
        }
        else {
            props.Logout();
        }
    }

    async function getAuthen(username) {
        const result = await fetch(`/api/auth/${username}`);
        if(result.ok) {
            return true;
        }
        return false;
    }

    const [author, setAuthor] = React.useState('');
    const [quote, setQuote] = React.useState('Searching for a quote...');
    const [show, setShow] = React.useState(true);
    const [display, setDisplay] = React.useState('flex');

    React.useEffect(() => {
        if(show) {
            setDisplay('flex');
        }
        else if(!show) {
            setDisplay('none');
        }
    }, [show]);

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
        fetch(`/api/feed/${props.username}`)
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

    const postsArray = [];
    if(allPosts.length) {
        for(const [i, post] of allPosts.entries()) {
            const liked = likes.includes(post.place);
            const date = getDate(new Date(post.time));
            const time = getTime(new Date(post.time));
            postsArray.push(
                <Post key={post.place} id={allPosts.length - post.place - 1} title={post.title} content={post.content} user={post.user} username={props.username} time={time} date={date} liked={liked}/>
            );
        }
    }

    const [theTitle, setTheTitle] = React.useState('');
    const [theContent, setTheContent] = React.useState('');

    return (
        <main>
        <div id="topHeader">
            <div id="bars" onClick={() => setShow(!show)}>&#x2630;</div>
            <h2>Feed</h2>
            <div id="userInfo" onClick={() => props.Logout()}>{props.username}</div>
        </div>
        <div id="feedAndQuote">
            <div id="quoteAndNew">
                <aside id="quote" style={{display: display}}>
                    <h3 id="quoteTitle">Inspirational Quote</h3>
                    <p id="thequote">"{quote}"</p>
                    <p id="author">{author}</p>
                </aside>
                <div id="newpost" style={{display: display}}>
                    <p id="newPostHead"><b>New Post</b></p>
                    <label htmlFor="text">Post title</label>
                    <textarea id="postTitle" name="postTitle" placeholder="Enter a title (max 60 characters)" pattern=".{1,50}" title="Your title is too long" required value={theTitle} onChange={(e) => setTheTitle(e.target.value)}></textarea>                    <label htmlFor="textarea">Post text</label>
                    <textarea id="postContent" name="newPost" placeholder="Share your thoughts" required value={theContent} onChange={(e) => setTheContent(e.target.value)}></textarea>
                    <button id="postIt" disabled={!(theTitle && theContent)} onClick={() => {const newPost = addPost(theContent, theTitle, allPosts.length, props.username); allPosts.unshift(newPost); setTheContent(''); setTheTitle('');}}>Post</button>
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

function addPost(content, title, length, user) {

        let obj = new Object;
        obj.title = title;
        obj.content = content;
        obj.user = user;
        obj.time = new Date();
        obj.likes = 0;
    
        fetch(`/api/feed/post/${obj.user}`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(obj),
        });
    
        obj.place = length;

        return obj;
};
