import React from 'react';

import {NavLink} from 'react-router-dom';

import './posts.css';

export function LikedPosts() {

    const [posts, setPosts] = React.useState([]);
    const [openPost, setOpenPost] = React.useState([]);

    React.useEffect(() => {
    fetch('/api/posts/posts')
        .then((response) => response.json())
        .then(async (allPosts) => {

            return fetch(`/api/posts/liked/${localStorage.getItem('username')}`)
                .then((response) => response.json())
                .then((posts) => {
                    if(typeof(posts[0] === 'number')) {
                        for(const [i, thepost] of posts.entries()) {
                            posts[i] = {allPlace: thepost};
                        }
                    }

                    posts = posts.sort((a,b) => b.allPlace - a.allPlace);

                    let newPosts = [];
                    for(const postIndex of posts) {
                        newPosts.push(allPosts[allPosts.length - postIndex.allPlace - 1]);
                    }

                    setPosts(newPosts);
                    localStorage.setItem('posts', JSON.stringify(posts));
                })
        })
        .catch(() => {
            const postsText = localStorage.getItem('posts');
            if(postsText) {
                setPosts(JSON.parse(postsText));
            } 
        });
    }, []);

    const postRows = [];
    if(posts.length) {
        for(const [i, post] of posts.entries()) {
            postRows.push(
                <li key={i} className='post'>
                    <input type='checkbox' className='reveal' id={'reveal' + i} />
                    <label id={'label' + i} className='label' htmlFor={'reveal' + i}>
                        <div id={'head' + i} className='head'>
                            <div id={'date' + i} className='date'>{getDate(new Date(post.time))}</div>
                            <div id={'title' + i} className='title'>{post.title}</div>
                        </div>
                        <div className='content' id={'content' + i}>{post.content}</div>
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
                <NavLink id="bars" to='../posts'>&#x2630;</NavLink>
                <h2 id="head">Liked Posts</h2>
                {/* <div id="userInfo" onclick="backToLogin()">Login</div> */}
            </div>

            <div id="likeTable" className="table">
                <div id="headTable">
                    <div id="date" className="date">
                        Date
                    </div>
                    <div id="title" className="title">
                        Title
                    </div>
                </div>
                <div id="likePosts">{postRows}</div>
            </div>
        </main>
    );
}

function getDate(time) {
    let value = '';
    let month = time.getMonth() + 1;
    value += month;
    value += '/';
    value += time.getDate();
    value += '/';
    value += time.getFullYear();
    return value;
}