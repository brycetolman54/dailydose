import React from 'react';

import {NavLink} from 'react-router-dom';

import './posts.css';

import {getDate, openPost} from './posts.jsx';

export function LikedPosts() {

    const [posts, setPosts] = React.useState([]);

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
                <li key={i} className='postRow'>
                    <input type='checkbox' className='postreveal' id={'postreveal' + i} />
                    <label id={'postlabel' + i} className='postlabel' htmlFor={'postreveal' + i} onClick={() => openPost(i)}>
                        <div id={'posthead' + i} className='posthead'>
                            <div id={'postdate' + i} className='postdate'>{getDate(new Date(post.time))}</div>
                            <div id={'posttitle' + i} className='posttitle'>{post.title}</div>
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
                <NavLink id="bars" to='../posts' onClick={() => localStorage.removeItem('openPost')}>&#x2630;</NavLink>
                <h2 id="head">Liked Posts</h2>
                {/* <div id="userInfo" onclick="backToLogin()">Login</div> */}
            </div>
            <div id="postlikeTable" className="posttable">
                <div id="postheadTable">
                    <div id="postdate" className="postdate">
                        Date
                    </div>
                    <div id="posttitle" className="posttitle">
                        Title
                    </div>
                </div>
                <div id="postlikePosts">{postRows}</div>
            </div>
        </main>
    );
}
