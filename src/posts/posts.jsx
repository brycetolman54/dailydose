import React from 'react';

import {NavLink} from 'react-router-dom';

import './posts.css';

import {getDate} from '../feed/feed.jsx';

export function Posts(props) {

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

    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('/api/posts/posts')
            .then((response) => response.json())
            .then(async (allPosts) => {

                return fetch(`/api/posts/mine/${props.username}`)
                    .then((response) => response.json())
                    .then((posts) => {
                        posts = posts.sort((a,b) => b.allPlace - a.allPlace);

                        let newPosts = [];
                        for(const postIndex of posts) {
                            newPosts.push(allPosts[allPosts.length - postIndex.allPlace - 1]);
                        }

                        setPosts(newPosts);
                        localStorage.setItem('myPosts', JSON.stringify(newPosts));
                    })
            })
            .catch(() => {
                const postsText = localStorage.getItem('myPosts');
                if(postsText) {
                    setPosts(JSON.parse(postsText));
                } 
            });
    }, []);

    const postRows = [];
    if(posts.length) {
        for(const [i, post] of posts.entries()) {
            postRows.push(
                <li key={i} className='postRow'>
                    <input type='checkbox' className='postreveal' id={'postreveal' + i} />
                    <label id={'postlabel' + i} className='postlabel' htmlFor={'postreveal' + i} onClick={() => openPost(i)}>
                        <div id={'posthead' + i} className='posthead'>
                            <div id={'postdate' + i} className='postdate'>{getDate(new Date(post.time))}</div>
                            <div id={'posttitle' + i} className='posttitle'>{post.title}</div>
                            <div id={'postlike' + i} className='postlike'>{post.likes}</div>
                        </div>
                        <div className='postcontent' id={'postcontent' + i}>{post.content}</div>
                    </label>
                </li>
            );
        }
    }
    else {
        postRows.push(
            <div key='1'>
                <div className='empty'>Waiting for posts...</div>
            </div>
        )
    }

    return (
        <main>
            <div id="topHeader">
                <NavLink id="bars" to='../likedPosts' onClick={() => localStorage.removeItem('openPost')}>&#x2630;</NavLink>
                <h2 id="head">My Posts</h2>
                <div id="userInfo" onClick={() => props.Logout()}>{props.username}</div>
            </div>
            <div id="postsTable" className="posttable">
                <div id="postheadTable">
                    <div id="postdate" className="postdate">
                        Date
                    </div>
                    <div id="posttitle" className="posttitle">
                        Title
                    </div>
                    <div id="postlike" className="postlike">
                        Likes
                    </div>
                </div>
                <div id="posts">{postRows}</div>
            </div>

        </main>
    );
}

export function openPost(i) {
    let opened = JSON.parse(localStorage.getItem('openPost'));

    if((opened || opened ===0) && opened !== i) {
        const reveal = document.getElementById(`postreveal${opened}`);
        reveal.checked = false;
    }
    
    opened = i;
    
    const content = document.getElementById(`postcontent${opened}`);
    content.style.display = 'flex';
    
    localStorage.setItem('openPost', JSON.stringify(opened));
}

// Do like you did in the Simon scores for here. This should be the easiest, followed by the feed and then the login and then the chats... :)